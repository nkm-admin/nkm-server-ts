import BaseController from '../BaseController'

export default class User extends BaseController {
  public async getUserList() {
    const { ctx } = this
    const { rows: data, count } = await ctx.service.system.user.getUserList({
      ...ctx.conversionPagination({
        page: +ctx.query.page,
        limit: +ctx.query.limit
      })
    })
    ctx.body = this.success({
      data,
      count
    })
  }

  public async registered() {
    const { ctx } = this
    await ctx.service.system.user.registered(ctx.request.body)
    ctx.body = this.success()
  }

  public async del() {
    const { ctx } = this
    await ctx.service.system.user.del(ctx.request.body.id)
    ctx.body = this.success()
  }

  public async modifyStatus() {
    const { ctx } = this
    await ctx.service.system.user.modifyStatus(ctx.request.body.id, ctx.request.body.status)
    ctx.body = this.success()
  }

  public async modifyRole() {
    const { ctx } = this
    await ctx.service.system.user.modifyRole(ctx.request.body.id, ctx.request.body.role)
    ctx.body = this.success()
  }

  public async resetPassword() {
    const { ctx } = this
    await ctx.service.system.user.resetPassword(ctx.request.body.id)
    ctx.body = this.success()
  }

  public async modifyPassword() {
    const { ctx } = this
    await ctx.service.system.user.modifyPassword(ctx.request.body.password)
    ctx.body = this.success()
  }

  public async updateUserInfo() {
    const { ctx } = this
    await ctx.service.system.user.updateUserInfo(ctx.request.body)
    ctx.body = this.success()
  }
}
