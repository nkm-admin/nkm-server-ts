import { Service } from 'egg'
import { NO_AUTHORIZATION_REQUIRED_ROUTES } from '../settings'

export default class Login extends Service {
  /**
   * 生成用户信息
   * @param user 用户信息
   */
  private async _generateUserInfo(user: {
    login_name: string;
    password: string;
    display_name: string;
    email: string;
    role: string;
    status: number;
    is_system_admin: number;
    avatar: string;
  }) {
    const { ctx, app } = this

    // 生成token并存入redis
    const token = ctx.helper.md5(user.login_name)

    const authority = await this._generateAuthority(user.role)

    delete user.password

    await app.redis.hmset(token, {
      apis: JSON.stringify(authority.apis),
      ...ctx.helper.objectKeyToLowerCameCase(user)
    })
    app.redis.expire(token, app.config.base.redis.expire)

    delete authority.apis

    return {
      token,
      userInfo: user,
      ...authority
    }
  }

  // 生成权限信息
  private async _generateAuthority(roleCode: string) {
    console.log(roleCode)
    const { ctx } = this

    // 查找用户对应的角色权限
    const roleList: any = await ctx.model.Role.findAll({
      where: {
        code: roleCode.split(',')
      },
      attributes: ['permission'],
      raw: true
    })

    // 账号没有权限访问
    if (!roleList) ctx.throw(200, ctx.errorMsg.login.authorityError)

    // 查找所有的资源
    let resource: any = []

    try {
      resource = await ctx.model.Resource.findAll({
        raw: true,
        where: {
          enabled: 1,
          is_deleted: 0
        }
      })
    } catch (e) {
      ctx.throw(200, ctx.errorMsg.login.authorityError)
    }

    // 当前用户的权限
    let currentUserPermission: string[] = []
    roleList.forEach((item: {
      permission: string;
    }) => {
      currentUserPermission.push(...item.permission.split(','))
    })
    currentUserPermission = [...new Set(currentUserPermission)]

    const menu: object[] = []

    const menuUrls: string[] = []

    const btnCodes: string[] = []

    const apis: string[] = []

    resource.forEach((item: any) => {
      if (currentUserPermission.findIndex(v => +v === item.id) !== -1) {
        switch (item.type) {
          case 'system:resource:menu':
            menu.push(item)
            menuUrls.push(item.path)
            break
          case 'system:resource:page':
            menuUrls.push(item.path)
            break
          case 'system:resource:btn':
            btnCodes.push(item.code)
            break
          case 'system:resource:api':
            apis.push(item.path)
            break
        }
      }
    })

    return {
      menu: ctx.helper.sortTreeArr(ctx.helper.deepTree(menu)),
      menuUrls,
      btnCodes,
      apis: [
        ...apis,
        ...NO_AUTHORIZATION_REQUIRED_ROUTES
      ]
    }
  }

  // 更新最后的登录信息
  private async _updateLastLoginInfo(userName: string) {
    await this.ctx.model.User.update({
      last_login_time: Date.now(),
      agent: this.ctx.headers['user-agent']
    }, {
      where: {
        login_name: userName
      }
    })
  }

  public async login({
    loginName,
    password,
    captcha,
    token
  }: {
    loginName: string;
    password: string;
    captcha: string;
    token: string;
  }) {
    const { ctx, app } = this
    const _captcha = await app.redis.get(`captcha:${token}`)

    // 验证码错误
    if (captcha !== _captcha) {
      ctx.throw(200, ctx.errorMsg.common.captchaError)
    }

    const user: any = await ctx.model.User.findOne({
      where: {
        login_name: loginName,
        status: 1
      },
      raw: true
    })

    // 用户不存在
    if (!user) {
      ctx.throw(200, ctx.errorMsg.login.noUser)
    }

    // 密码不正确
    if (user.password !== ctx.helper.md5(password)) {
      ctx.throw(200, ctx.errorMsg.login.passwordError)
    }

    // 更新最后登录信息
    await this._updateLastLoginInfo(user.login_name)

    return this._generateUserInfo(user)
  }
}
