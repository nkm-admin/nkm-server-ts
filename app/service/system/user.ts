import { Service } from 'egg'
import { DEFAULT_PASSWORD } from '../../settings'

interface UserInfo {
  loginName: string;
  password: string;
  displayName: string;
  email: string;
  role: string;
  registeredTime: number;
  lastLoginTime: number;
  status: number;
  isSystemAdmin: number;
  avatar: string;
}

export default class User extends Service {
  // 判断用户是否存在
  private async _judgeUser<T>(id: T) {
    const { ctx } = this
    const user = await ctx.model.User.findOne({
      where: {
        id
      }
    })
    if (!user) ctx.throw(200, ctx.errorMsg.user.userNotExists)
  }

  // 获取所有用户
  public async getUserList({
    page = 0,
    limit = 1
  }: {
    page: number;
    limit: number;
  }) {
    const data: any = this.ctx.model.User.findAndCountAll({
      attributes: ['id', 'login_name', 'display_name', 'email', 'role', 'registered_time', 'last_login_time', 'status', 'is_system_admin', 'avatar', 'agent', 'is_deleted'],
      offset: page,
      limit,
      where: {
        is_deleted: 0
      }
    }).then((res: any) => {
      res.rows.map((item: any) => {
        item.role = item.role.split(',')
        return item
      })
      return res
    })
    return data
  }

  // 注册用户，注册功能不对外开放
  public async registered(userInfo: UserInfo) {
    const { ctx } = this

    // 校验
    ctx.validate({
      loginName: 'loginName',
      displayName: 'name',
      email: {
        type: 'email',
        required: false
      },
      avatar: {
        type: 'string',
        required: false
      }
    })

    const user = await ctx.model.User.findOne({
      where: {
        login_name: userInfo.loginName
      }
    })

    if (user) ctx.throw(200, ctx.errorMsg.user.userExists)

    return ctx.model.User.create({
      ...ctx.helper.objectKeyToUnderline(userInfo),
      password: ctx.helper.md5(userInfo.password),
      registered_time: Date.now(),
      last_login_time: Date.now()
    })
  }

  // 删除用户
  public async del(id: number) {
    await this._judgeUser(id)

    return this.ctx.model.User.update({
      is_deleted: 1
    }, {
      where: {
        id
      }
    })
  }

  // 修改用户状态
  public async modifyStatus(id: number, status: number) {
    await this._judgeUser(id)

    return this.ctx.model.User.update({
      status
    }, {
      where: {
        id
      }
    })
  }

  // 用户修改角色
  public async modifyRole(id: number, role: string) {
    await this._judgeUser(id)

    return this.ctx.model.User.update({
      role
    }, {
      where: {
        id
      }
    })
  }

  // 重置密码
  public async resetPassword(id: number) {
    const { ctx } = this
    await this._judgeUser(id)

    return ctx.model.User.update({
      password: ctx.helper.md5(ctx.helper.md5(DEFAULT_PASSWORD))
    }, {
      where: {
        id
      }
    })
  }

  // 修改密码
  public async modifyPassword(password: string) {
    const { ctx } = this

    const id = await ctx.app.redis.hget(ctx.request.headers.token, 'id')

    await this._judgeUser(id)

    return ctx.model.User.update({
      password: ctx.helper.md5(password)
    }, {
      where: {
        id
      }
    })
  }

  public async updateUserInfo({
    displayName,
    email,
    avatar
  }: {
    displayName: string;
    email: string;
    avatar: string;
  }) {
    const { ctx, app } = this

    ctx.validate({
      displayName: 'name',
      email: 'email',
      avatar: 'string'
    })

    // 从reids中删除匹配的文件路径
    await ctx.deleteFilesByReids(avatar, app)

    const id = await ctx.app.redis.hget(ctx.request.headers.token, 'id')

    await this._judgeUser(id)

    return ctx.model.User.update({
      display_name: displayName,
      email,
      avatar
    }, {
      where: {
        id
      }
    })
  }
}
