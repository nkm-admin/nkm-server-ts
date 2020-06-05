import { Service } from 'egg'

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

  // test
  public async create() {
    return this.ctx.model.User.create({
      user_login_name: 'test',
      user_password: '123456',
      display_name: 'displayname',
      user_email: 'email',
      role: 'role',
      user_registered: 123,
      last_login_time: 123,
      user_status: 1,
      is_system_admin: 1,
      avatar: '12'
    })
  }
}
