import BaseController from '../BaseController'

export default class Dictionary extends BaseController {
  public async getTree() {
    const data = await this.service.system.dictionary.getTree()
    this.ctx.body = this.success({
      data
    })
  }

  public async save() {
    await this.service.system.dictionary.save(this.ctx.request.body)
    this.ctx.body = this.success()
  }

  public async del() {
    await this.service.system.dictionary.del(this.ctx.request.body.id)
    this.ctx.body = this.success()
  }
}
