import { Service } from 'egg'

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
}
