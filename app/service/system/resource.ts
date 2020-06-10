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
  // 通过id查找是否存在
  private async _queryTheExistenceById(id: number) {
    const resource = await this.ctx.model.Resource.findOne({
      where: {
        id,
        is_delete: 0
      },
      raw: true
    })
    if (!resource) return this.ctx.throw(200, this.ctx.errorMsg.resource.notExists)
  }

  // 通过code查找是否存在
  private async _queryTheExistenceByCode(code: string) {
    const resource = await this.ctx.model.Resource.findOne({
      where: {
        code,
        is_delete: 0
      },
      raw: true
    })
    if (resource) return this.ctx.throw(200, this.ctx.errorMsg.resource.exists)
  }

  private async _create(option: CreateOption) {
    const { ctx } = this

    await this._queryTheExistenceByCode(option.code)

    return ctx.model.Resource.create({
      ...ctx.helper.objectKeyToUnderline(option),
      create_time: Date.now()
    })
  }

  private async _update(option: UpdateOption) {
    const { ctx, app } = this

    await this._queryTheExistenceById(option.id)

    const resource = await this.ctx.model.Resource.findOne({
      where: {
        id: {
          [app.Sequelize.Op.not]: option.id
        },
        code: option.code,
        is_delete: 0
      },
      raw: true
    })

    if (resource) return this.ctx.throw(200, this.ctx.errorMsg.resource.exists)

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

    await this._queryTheExistenceById(id)

    return ctx.model.Resource.update({
      is_delete: 1
    }, {
      where: {
        id
      }
    })
  }
}
