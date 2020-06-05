import BaseController from './BaseController'

export default class Login extends BaseController {
  public async login() {
    const { ctx } = this
    const data = await ctx.service.login.login(ctx.request.body)
    ctx.body = this.success({
      data
    })
  }
}
