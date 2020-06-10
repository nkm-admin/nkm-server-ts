import BaseController from '../BaseController'

export default class Role extends BaseController {
  public async getList() {
    const data = await this.ctx.service.system.role.getList()
    this.ctx.body = this.success({
      data
    })
  }

  public async save() {
    await this.ctx.service.system.role.save(this.ctx.request.body)
    this.ctx.body = this.success()
  }

  public async del() {
    await this.ctx.service.system.role.del(this.ctx.request.body.id)
    this.ctx.body = this.success()
  }
}
