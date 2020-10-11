import { Controller } from 'egg'

export default class BaseController extends Controller {
  public success(response: {
    data?: any;
    message?: string;
    success?: boolean;
    code?: string;
    count?: number;
  } = {}) {
    // 转换字段为下划线分割为小驼峰
    const deepConversion = (data: any) => {
      let newData: any = null
      if (Array.isArray(data)) {
        newData = []
        data.forEach((item, i) => {
          const _data = item.dataValues || item
          if (this.ctx.helper.isObject(_data)) {
            newData[i] = {}
            for (const [key, value] of Object.entries(_data)) {
              // 如果是数组或者对象继续递归
              if ((Array.isArray(value) && value.length) || this.ctx.helper.isObject(value)) {
                newData[i][this.ctx.helper.toLowerCamelCase(key)] = deepConversion(value)
              } else {
                newData[i][this.ctx.helper.toLowerCamelCase(key)] = value
              }
            }
          } else {
            newData[i] = _data
          }
        })
      } else if (this.ctx.helper.isObject(data)) {
        const _data = data.dataValues || data
        newData = {}
        for (const [key, value] of Object.entries(_data)) {
          // 如果是数组或者对象继续递归
          if ((Array.isArray(value) && value.length) || this.ctx.helper.isObject(value)) {
            newData[this.ctx.helper.toLowerCamelCase(key)] = deepConversion(value)
          } else {
            newData[this.ctx.helper.toLowerCamelCase(key)] = value
          }
        }
      } else {
        newData = data
      }
      return newData
    }

    response.data = deepConversion(response.data)

    return {
      ...this.ctx.responseStruc(),
      ...response
    }
  }

  public fail(response: Response) {
    return {
      ...this.ctx.responseStruc(this.ctx.errorMsg.common.failed),
      ...response,
      success: false
    }
  }
}
