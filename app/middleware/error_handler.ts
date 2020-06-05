import { Context } from 'egg'

export default function() {
  return async function errorHandler(ctx: Context, next: () => Promise<any>) {
    try {
      await next()
    } catch (err) {
      // 所有的异常都在 app 上触发一个 error 事件，框架会记录一条错误日志
      ctx.app.emit('error', err, ctx)

      const status = err.status || 500

      // 生产环境时 500 错误的详细错误内容不返回给客户端，因为可能包含敏感信息
      let error: object | string = {}

      if (status === 500 && ctx.app.config.env === 'prod') {
        error = 'Internal Server Error'
      }

      // 如果状态为200时为业务逻辑错误
      if (status === 200) {
        error = {
          message: err.errorMsg || 'Internal Server Error',
          code: err.code || 500,
          success: false,
          data: null,
          count: 0
        }
      }

      ctx.body = error
      ctx.status = status
    }
  }
}
