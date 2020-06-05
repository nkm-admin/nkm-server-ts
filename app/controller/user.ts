import BaseController from './BaseController'

export default class User extends BaseController {
  public async getUserList() {
    const { ctx } = this
    const { rows: data, count } = await ctx.service.user.getUserList({
      limit: 10,
      page: 0
    })
    ctx.body = this.success({
      data,
      count
    })
  }
}
