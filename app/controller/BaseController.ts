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
    const deepConversion = <T>(data: T): T => {
      let newData: any = null
      if (Array.isArray(data)) {
        newData = []
        data.forEach((item, i) => {
          if (this.ctx.helper.isObject(item)) {
            newData[i] = {}
            for (const [key, value] of Object.entries(item)) {
              // 如果是数组或者对象继续递归
              if ((Array.isArray(value) && value.length) || this.ctx.helper.isObject(value)) {
                newData[i][this.ctx.helper.toLowerCamelCase(key)] = deepConversion(value)
              } else {
                newData[i][this.ctx.helper.toLowerCamelCase(key)] = value
              }
            }
          } else {
            newData[i] = item
          }
        })
      } else if (this.ctx.helper.isObject(data)) {
        newData = {}
        for (const [key, value] of Object.entries(data)) {
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

    if (Array.isArray(response.data)) {
      response.data = deepConversion<object[]>(response.data.map((item: any) => item.dataValues))
    } else if (this.ctx.helper.isObject(response.data)) {
      response.data = deepConversion<object>(response.data.dataValues || response.data)
    }

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
