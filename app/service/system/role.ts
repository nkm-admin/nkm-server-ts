import { Service } from 'egg'

interface CreateOption {
  name: string;
  code: string;
  permission: string;
}

interface UpdateOption extends CreateOption {
  id: number;
}

interface SaveOption extends UpdateOption {

}

export default class Role extends Service {
  private async _judgeRole({
    id,
    code
  }: {
    id?: number;
    code?: string;
  }) {
    const { ctx } = this

    if (id) {
      const role = await ctx.model.Role.findOne({
        id,
        where: {
          id
        }
      })
      if (!role) return ctx.throw(200, ctx.errorMsg.role.notExists)
    }

    if (code && !id) {
      const role = await ctx.model.Role.findOne({
        code,
        where: {
          code
        }
      })
      if (role) return ctx.throw(200, ctx.errorMsg.role.exists)
    }
  }

  private async _create(option: CreateOption) {
    const { ctx } = this

    await this._judgeRole({
      code: option.code
    })

    return ctx.model.Role.create({
      ...option,
      create_time: Date.now()
    })
  }

  private async _update(option: UpdateOption) {
    const { ctx } = this
    await this._judgeRole({
      id: option.id
    })

    return ctx.model.Role.update({
      ...ctx.helper.objectKeyToUnderline(option)
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
}
