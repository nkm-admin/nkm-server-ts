import BaseController from './BaseController'

export default class Captcha extends BaseController {
  public async init() {
    this.ctx.body = this.success({
      data: await this.ctx.service.captcha.init()
    })
  }
}
