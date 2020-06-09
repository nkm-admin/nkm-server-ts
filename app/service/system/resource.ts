import { Service } from 'egg'

interface CreateOption {
  code: string;
  name: string;
  type: string;
  parentId: number;
  parentCode: string;
  icon: string;
  sort: string;
  path: string;
  enable: number;
}

interface UpdateOption extends CreateOption {
  id: number;
}

interface SaveOption extends UpdateOption {}

export default class Resource extends Service {
  private async _judgeResource({
    id,
    code,
    flag
  }: {
    id?: number;
    code?: string;
    flag: 'create' | 'update' | 'del';
  }) {
    const { ctx } = this

    if (flag === 'update') {
      const resource = await ctx.model.Resource.findOne({
        id,
        code,
        where: {
          id
        },
        raw: true
      })

      // 资源编码不存在
      if (!resource) return ctx.throw(200, ctx.errorMsg.resource.notExists)

      // 资源编码重复
      if (resource.code === code) return ctx.throw(200, ctx.errorMsg.resource.exists)
    }

    if (flag === 'create') {
      const resource = await ctx.model.Resource.findOne({
        code,
        where: {
          code
        },
        raw: true
      })
      if (resource) return ctx.throw(200, ctx.errorMsg.resource.exists)
    }

    if (flag === 'del') {
      const resource = await ctx.model.Resource.findOne({
        id,
        where: {
          id
        },
        raw: true
      })
      if (!resource) return ctx.throw(200, ctx.errorMsg.resource.notExists)
    }
  }

  private async _create(option: CreateOption) {
    const { ctx } = this

    await this._judgeResource({
      code: option.code,
      flag: 'create'
    })

    return ctx.model.Resource.create({
      ...ctx.helper.objectKeyToUnderline(option),
      create_time: Date.now()
    })
  }

  private async _update(option: UpdateOption) {
    const { ctx } = this

    await this._judgeResource({
      id: option.id,
      code: option.code,
      flag: 'update'
    })

    return ctx.model.Resource.update({
      ...ctx.helper.objectKeyToUnderline(option)
    }, {
      where: {
        id: option.id
      }
    })
  }

  public async save(option: SaveOption) {
    return option.id ? this._update(option) : this._create(option)
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
      id,
      flag: 'del'
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
