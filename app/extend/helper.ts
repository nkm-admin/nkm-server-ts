import { isObject, toUnderline } from '@xuanmo/javascript-utils'
import { md5 } from '../utils/crypto'

export default {
  isObject,
  md5,

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
  }
}
