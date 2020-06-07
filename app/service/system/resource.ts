import { Service } from 'egg'

export default class Resource extends Service {
  private async _judgeResource({
    id,
    code
  }: {
    id?: number;
    code?: string;
  }) {
    const { ctx } = this
    const resource = await ctx.model.Resource.findOne({
      id,
      code
    }, {
      where: {
        id,
        code
      }
    })

    if (id && !resource) return ctx.throw(200, ctx.errorMsg.resource.notExists)

    if (code && resource) return ctx.throw(200, ctx.errorMsg.resource.exists)
  }

  public async create(option: {
    code: string;
    name: string;
    type: string;
    parentId: number;
    parentCode: string;
    icon: string;
    sort: string;
    path: string;
    enable: number;
  }) {
    const { ctx } = this

    await this._judgeResource({
      code: option.code
    })

    return ctx.model.Resource.create({
      ...ctx.helper.objectKeyToUnderline(option),
      create_time: Date.now()
    })
  }

  public async getTree() {
    const { ctx } = this

    const resource = await ctx.model.Resource.findAll({
      raw: true
    })

    return ctx.helper.sortTreeArr(ctx.helper.deepTree(resource))
  }

  public async del(id: number) {
    const { ctx } = this

    await this._judgeResource({
      id
    })

    return ctx.model.Resource.update({
      is_delete: 1
    }, {
      where: {
        id
      }
    })
  }
}
