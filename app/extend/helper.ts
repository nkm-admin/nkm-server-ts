import { createHash } from 'crypto'

/**
  * 是否为对象
  * @param obj any
  * @return {boolean} boolean
  */
const isObject = (obj: any): boolean => Object.prototype.toString.call(obj) === '[object Object]'

/**
 * 下划线转小驼峰
 * @param str 转换字符串：user_info 或者 user.info
 */
const toLowerCamelCase = (str: string): string => {
  return str.replace(/((_|\.)[a-z])/g, $1 => $1.replace(/_|\./, '').toLocaleUpperCase())
}

/**
 * 小驼峰转下划线分割
 * @param str 转换字符串：userInfo
 */
const toUnderline = (str: string): string => {
  return str.replace(/([A-Z])/g, $1 => `_${$1.toLocaleLowerCase()}`)
}

export default {
  toLowerCamelCase,

  toUnderline,

  isObject,

  /**
   * md5加密
   * @param str 需要加密的字符串
   * @param salt 加盐
   */
  md5: (str: string, salt = true): string => createHash('md5').update(`${str}${salt ? Date.now() : ''}`).digest('hex'),

  /**
   * 将对象的key如果为下划线命名转换为小驼峰
   * @param obj 被转换的对象
   */
  objectKeyToLowerCameCase: (obj: object): object => {
    const result = {}
    for (const [_key, _value] of Object.entries(obj)) {
      result[toLowerCamelCase(_key)] = _value
    }
    return result
  },

  /**
   * 将对象的key如果为驼峰命名转换为下划线
   * @param obj 被转换的对象
   */
  objectKeyToUnderline: (obj: object): object => {
    const result = {}
    for (const [_key, _value] of Object.entries(obj)) {
      result[toUnderline(_key)] = _value
    }
    return result
  },

  /**
   * 一维数组转换为树形结构
   * @param {Array} arr 需要被转换的一维数组
   * @return {Array} 树形数据
   */
  deepTree: (arr: object[]): object[] => {
    const deepTree = (arr: any[], parentId = 0) => {
      const result: object[] = []
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].parent_id === parentId) {
          arr[i].children = deepTree(arr, arr[i].id)
          result.push(arr[i])
        }
      }
      return result
    }
    return deepTree(arr)
  },

  /**
   * 对数组进行排序
   * @param {Array} arr 需要被排序的树形数组
   * @return {Array} 处理后的数组
   */
  sortTreeArr: (arr: object[]): object[] => {
    function sortArr<T>(arr: T[]): T[] {
      arr.map((item: any) => {
        if (item.children.length) item.children = sortArr(item.children)
        return item
      })
      return arr.sort((a: any, b: any) => a.sort - b.sort)
    }

    return sortArr(arr)
  },

  /**
   * 判断是否为空
   * @param {*} value 数据源
   * @return {boolean} boolean
   */
  isEmpty: (value: any): boolean => {
    if (Array.isArray(value)) return value.length === 0

    if (isObject(value)) return JSON.stringify(value) === '{}'

    return [null, undefined, ''].includes(value)
  }
}
