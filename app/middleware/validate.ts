import { Context } from 'egg'
import { IGNORE_LOGIN_ROUTES } from '../settings'

export default function() {
  return async function validate(ctx: Context, next: () => Promise<any>) {
    try {
      const token = ctx.request.headers.token
      const userInfo = await ctx.app.redis.hgetall(token)

      if (IGNORE_LOGIN_ROUTES.findIndex(v => v.test(ctx.path)) !== -1) {
        return await next()
      }

      if (!token || JSON.stringify(userInfo) === '{}') {
        ctx.throw(200, ctx.errorMsg.common.invalidToken)
      }

      // token续期
      await ctx.app.redis.expire(token, ctx.app.config.base.redis.expire)

      const { isSystemAdmin, apis } = userInfo

      if (+isSystemAdmin) return await next()

      // 非管理员账号需要校验接口请求权限
      if (apis.indexOf(ctx.path) === -1) {
        ctx.throw(200, ctx.errorMsg.common.noAuthority)
      }

      await next()
    } catch (err) {
      ctx.logger.error('[全局拦截]', err)
      if (err.code === 'invalid_param') {
        ctx.throw(200, {
          errorMsg: err.errors.length > 1 ? ctx.errorMsg.common.verificationFailed.errorMsg : err.errors[0].message,
          code: ctx.errorMsg.common.verificationFailed.code
        })
      }

      ctx.throw(200, {
        errorMsg: err.errorMsg || ctx.errorMsg.common.serverError.errorMsg,
        code: err.code || ctx.errorMsg.common.serverError.code
      })
    }
  }
}
