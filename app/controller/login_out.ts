import BaseController from './BaseController'

export default class LoginOut extends BaseController {
  public async loginOut() {
    const { ctx } = this
    await ctx.service.loginOut.loginOut(ctx.headers.token)
    ctx.body = this.success()
  }
}
