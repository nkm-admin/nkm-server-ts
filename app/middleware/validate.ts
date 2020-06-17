import { Context } from 'egg'
import { IGNORE_ROUTES } from '../settings'

export default function() {
  return async function validate(ctx: Context, next: () => Promise<any>) {
    try {
      const token = ctx.request.headers.token
      const userInfo = await ctx.app.redis.hgetall(token)

      if (IGNORE_ROUTES.findIndex(v => v.test(ctx.path)) !== -1) {
        return await next()
      }

      if (!token || JSON.stringify(userInfo) === '{}') {
        ctx.throw(200, ctx.errorMsg.common.noToken)
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
    } catch (e) {
      console.log('validate校验失败===>', e)
      if (e.code === 'invalid_param') {
        ctx.throw(200, {
          errorMsg: e.errors.length > 1 ? ctx.errorMsg.common.verificationFailed.errorMsg : e.errors[0].message,
          code: ctx.errorMsg.common.verificationFailed.code
        })
      }

      ctx.throw(200, {
        errorMsg: e.errorMsg || ctx.errorMsg.common.serverError.errorMsg,
        code: e.code || ctx.errorMsg.common.serverError.code
      })
    }
  }
}
