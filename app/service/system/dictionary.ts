import { Service } from 'egg'

interface CreateOption {
  name: string;
  code: string;
  value: string;
  parentId: number;
  sort: number;
  isDelete: number;
}

interface UpdateOption extends CreateOption {
  id: number;
}

interface SaveOption extends UpdateOption {}

export default class Dictionary extends Service {
  private async _queryTheExistenceById(id: number) {
    const dictionary = await this.ctx.model.Dictionary.findOne({
      where: {
        id,
        is_deleted: 0
      },
      raw: true
    })
    if (!dictionary) return this.ctx.throw(200, this.ctx.errorMsg.dictionary.notExists)
  }

  // 通过code查找是否存在
  private async _queryTheExistenceByCode(code: string) {
    const dictionary = await this.ctx.model.Dictionary.findOne({
      where: {
        code,
        is_deleted: 0
      },
      raw: true
    })
    if (dictionary) return this.ctx.throw(200, this.ctx.errorMsg.dictionary.exists)
  }

  private async _create(option: CreateOption) {
    const { ctx } = this

    await this._queryTheExistenceByCode(option.code)

    return ctx.model.Dictionary.create({
      ...ctx.helper.objectKeyToUnderline(option),
      create_time: Date.now()
    })
  }

  private async _update(option: UpdateOption) {
    const { ctx, app } = this

    const dictionary = await this.ctx.model.Dictionary.findOne({
      where: {
        id: {
          [app.Sequelize.Op.not]: option.id
        },
        code: option.code,
        is_deleted: 0
      },
      raw: true
    })

    if (dictionary) return this.ctx.throw(200, this.ctx.errorMsg.dictionary.exists)

    return ctx.model.Dictionary.update({
      ...ctx.helper.objectKeyToUnderline(option),
      is_deleted: 0
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
    const dictionary = await ctx.model.Dictionary.findAll({
      raw: true,
      where: {
        is_deleted: 0
      }
    })
    const disabledIds: number[] = []
    const isManager = await ctx.isSystemManager(ctx)
    dictionary.map((item: any) => {
      if ((item.code === 'system' || item.code.indexOf('system:resource') !== -1) && !isManager) {
        disabledIds.push(item.id)
        item.disabled = true
      }
      if (disabledIds.includes(item.parent_id)) item.disabled = true
      return item
    })
    return ctx.helper.sortTreeArr(ctx.helper.deepTree(dictionary))
  }

  public async del(id: number) {
    await this._queryTheExistenceById(id)

    return this.ctx.model.Dictionary.update({
      is_deleted: 1
    }, {
      where: {
        id
      }
    })
  }
}
