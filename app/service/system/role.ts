import { Service } from 'egg'

interface CreateOption {
  name: string;
  code: string;
  ids: string;
}

interface UpdateOption extends CreateOption {
  id: number;
}

interface SaveOption extends UpdateOption {}

export default class Role extends Service {
  // 通过id查找是否存在
  private async _queryTheExistenceById(id: number) {
    const role = await this.ctx.model.Role.findOne({
      where: {
        id,
        is_delete: 0
      },
      raw: true
    })
    if (!role) return this.ctx.throw(200, this.ctx.errorMsg.role.notExists)
  }

  // 通过code查找是否存在
  private async _queryTheExistenceByCode(code: string) {
    const role = await this.ctx.model.Role.findOne({
      where: {
        code,
        is_delete: 0
      },
      raw: true
    })
    if (role) return this.ctx.throw(200, this.ctx.errorMsg.role.exists)
  }

  private async _create(option: CreateOption) {
    const { ctx } = this

    await this._queryTheExistenceByCode(option.code)

    return ctx.model.Role.create({
      ...option,
      create_time: Date.now()
    })
  }

  private async _update(option: UpdateOption) {
    const { ctx, app } = this

    // 查询角色是否已经存在
    const role = await this.ctx.model.Role.findOne({
      where: {
        id: {
          [app.Sequelize.Op.not]: option.id
        },
        code: option.code,
        is_delete: 0
      },
      raw: true
    })

    if (role) return this.ctx.throw(200, this.ctx.errorMsg.role.exists)

    return ctx.model.Role.update({
      ...ctx.helper.objectKeyToUnderline(option),
      permission: option.ids
    }, {
      where: {
        id: option.id
      }
    })
  }

  public async getList() {
    const result = this.ctx.model.Role.findAll({
      raw: true
    })
    return result.map((item: any) => {
      item.permission = item.permission.split(',').map((id: string) => +id)
      return item
    })
  }

  public async save(option: SaveOption) {
    return option.id ? this._update(option) : this._create(option)
  }

  public async del(id: number) {
    await this._queryTheExistenceById(id)

    return this.ctx.model.Role.update({
      is_delete: 1
    }, {
      where: {
        id
      }
    })
  }
}
