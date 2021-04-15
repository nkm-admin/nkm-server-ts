import { Application, Context } from 'egg'
import errorMessage from './error'
import { DEFAULT_PAGE_LIMIT } from '../settings'
import datejs from '../utils/date'

interface Response {
  data?: any;
  message?: string;
  success?: boolean;
  code?: string | number;
  count?: number;
}

export default {
  datejs,

  errorMsg: errorMessage,

  defaultPageLimit: DEFAULT_PAGE_LIMIT,

  /**
   * 判断是否为系统管理员
   * @param {Context} ctx Egg Context
   */
  async isSystemManager(ctx: Context): Promise<boolean> {
    const token = ctx.request.headers.token
    const { isSystemAdmin } = await ctx.app.redis.hgetall(token)
    return Boolean(+isSystemAdmin)
  },

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
  },

  /**
   * 删除redis中保存的文件路径
   * @param {string} str 内容
   * @param {EggApplication} app egg
   */
  async deleteFilesByReids(str: string, app: Application) {
    const files = str.match(/((?=(\/upload))(\S+\.\w{2,4}))+/gi) || []
    for (let i = 0; i < files.length; i++) {
      await app.redis.lrem('files', 0, files[i])
    }
  }
}
