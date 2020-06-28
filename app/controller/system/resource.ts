import BaseController from '../BaseController'

export default class Resource extends BaseController {
  public async save() {
    const { ctx } = this
    await ctx.service.system.resource.save(ctx.request.body)
    ctx.body = this.success()
  }

  public async getTree() {
    const { ctx } = this
    const data = await ctx.service.system.resource.getTree()
    ctx.body = this.success({
      data
    })
  }

  public async getList() {
    const { ctx } = this
    const data = await ctx.service.system.resource.getList()
    ctx.body = this.success({
      data
    })
  }

  public async del() {
    const { ctx } = this
    await ctx.service.system.resource.del(ctx.request.body.id)
    ctx.body = this.success()
  }
}
