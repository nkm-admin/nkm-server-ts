import { Service } from 'egg'

export default class Login extends Service {
  private async generateUserInfo(user: {
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
    const token = ctx.helper.md5(Date.now() + user.login_name)
    await app.redis.set(`token:${user.login_name}`, token, app.config.base.redis.mode, app.config.base.redis.expire)

    const authority = await this.generateAuthority(user['r.permission'])

    delete user['r.permission']
    delete user.password

    await app.redis.hmset(token, {
      apis: JSON.stringify(authority.apis),
      ...ctx.helper.objectKeyToLowerCameCase(user)
    })
    app.redis.expire(token, app.config.base.redis.expire)

    return {
      token,
      userInfo: user,
      ...authority
    }
  }

  // 生成权限信息
  private async generateAuthority(permission: string) {
    const { ctx } = this
    // 查找所有的资源
    let resource = []

    try {
      resource = await ctx.model.Resource.findAll({
        raw: true
      })
    } catch (e) {
      ctx.throw(200, ctx.errorMsg.login.authorityError)
    }

    // 当前用户的权限
    const currentUserPermission: string[] = permission.split(',')

    const menus: object[] = []

    const menusUrl: string[] = []

    const btnCodes: string[] = []

    const apis: string[] = []

    resource.forEach((item: any) => {
      if (currentUserPermission.findIndex(v => +v === item.id) !== -1) {
        switch (item.type) {
          case 'system:resource:menu':
            menus.push(item)
            menusUrl.push(item.path)
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
      menus: ctx.helper.sortTreeArr(ctx.helper.deepTree(menus)),
      menusUrl,
      btnCodes,
      apis: [
        ...apis,
        '/api/nkm-admin/login',
        '/api/nkm-admin/login-out',
        '/api/nkm-admin/upload'
      ]
    }
  }

  // 更新最后的登录信息
  private async updateLastLoginInfo(userName: string) {
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
      ctx.throw(200, ctx.errorMsg.login.captchaError)
    }

    const user = await ctx.model.User.findOne({
      where: {
        login_name: loginName,
        status: 1
      },
      include: [{
        model: ctx.model.Role,
        as: 'r',
        attributes: ['permission']
      }],
      raw: true
    })

    // 用户不存在
    if (!user) {
      ctx.throw(200, ctx.errorMsg.login.noUser)
    }

    // 密码不正确
    if (user.password !== password) {
      ctx.throw(200, ctx.errorMsg.login.passwordError)
    }

    // 更新最后登录信息
    this.updateLastLoginInfo(user.login_name)

    return this.generateUserInfo(user)
  }
}
