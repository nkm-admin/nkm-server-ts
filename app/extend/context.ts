import errorMessage from './error'
import { DEFAULT_PAGE_LIMIT } from '../settings'

interface Response {
  data?: any;
  message?: string;
  success?: boolean;
  code?: string;
  count?: number;
}

export default {
  errorMsg: errorMessage,

  defaultPageLimit: DEFAULT_PAGE_LIMIT,

  /**
   * 转换请求分页页码和每页分页量
   * @param {Object} pagination 分页参数
   * @param {number} pagination.page  - 当前页码
   * @param {string} pagination.limit - 分页量
   */
  conversionPagination({
    page = 1,
    limit = DEFAULT_PAGE_LIMIT
  }: {
    page: number;
    limit: number;
  }) {
    return {
      page: page - 1,
      limit: +limit
    }
  },

  // 请求返回结构
  responseStruc(res: Response = {}): Response {
    return {
      data: null,
      success: true,
      count: 0,
      message: errorMessage.common.success.errorMsg,
      code: errorMessage.common.success.code,
      ...res
    }
  }
}
