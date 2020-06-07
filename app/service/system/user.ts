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
  private async _judgeUser(id: number) {
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
    return this.ctx.model.User.findAndCountAll({
      offset: page,
      limit
    })
  }

  // 注册用户，注册功能不对外开放
  public async registered(userInfo: UserInfo) {
    const { ctx } = this
    const user = await ctx.model.User.findOne({
      where: {
        login_name: userInfo.loginName
      }
    })

    if (user) ctx.throw(200, ctx.errorMsg.user.userExists)

    return ctx.model.User.create({
      ...ctx.helper.objectKeyToUnderline(userInfo),
      password: ctx.helper.md5(userInfo.password, ''),
      registered_time: Date.now(),
      last_login_time: Date.now()
    })
  }

  // 删除用户
  public async del(id: number) {
    await this._judgeUser(id)

    return this.ctx.model.User.update({
      is_delete: 1
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
    await this._judgeUser(id)

    return this.ctx.model.User.update({
      password: this.ctx.helper.md5(DEFAULT_PASSWORD, '')
    }, {
      where: {
        id
      }
    })
  }

  // 修改密码
  public async modifyPassword(id: number, password: string) {
    await this._judgeUser(id)

    return this.ctx.model.User.update({
      password: this.ctx.helper.md5(password, '')
    }, {
      where: {
        id
      }
    })
  }
}
