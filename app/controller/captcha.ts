import BaseController from './BaseController'
import { createMathExpr } from 'svg-captcha'

export default class Captcha extends BaseController {
  public async init() {
    const { ctx, app } = this
    const { token } = ctx.query
    const { data, text } = createMathExpr({
      noise: 0,
      color: true,
      ignoreChars: '0o1i',
      width: 100,
      height: 30,
      fontSize: 36
    })
    if (!token) {
      const newToken = ctx.helper.md5(Date.now() + '')
      ctx.cookies.set('token', newToken)
      await app.redis.set(`captcha:${newToken}`, text, 'EX', 600)
      ctx.body = this.success({
        data: {
          token: newToken,
          data
        }
      })
    } else {
      await app.redis.set(`captcha:${token}`, text, 'EX', 600)
      ctx.body = this.success({
        data: {
          token,
          data
        }
      })
    }
  }
}
