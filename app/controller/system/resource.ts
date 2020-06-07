import BaseController from '../BaseController'

export default class Resource extends BaseController {
  public async create() {
    const { ctx } = this
    await ctx.service.system.resource.create(ctx.request.body)
    ctx.body = this.success()
  }

  public async getTree() {
    const { ctx } = this
    const data = await ctx.service.system.resource.getTree()
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
