import { createHash } from 'crypto'

export default {
  /**
   * 下划线转小驼峰
   * @param str 转换字符串
   */
  toLowerCamelCase: (str: string): string => {
    return str.replace(/(_[a-z])/g, $1 => $1.replace('_', '').toLocaleUpperCase())
  },

  /**
   * 是否为对象
   * @param obj any
   */
  isObject: (obj: any): boolean => Object.prototype.toString.call(obj) === '[object Object]',

  /**
   * md5
   * @param str 需要加密的字符串
   */
  md5: (str: string): string => createHash('md5').update(`${str}${Date.now()}`).digest('hex'),

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
