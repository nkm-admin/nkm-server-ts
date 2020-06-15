import { Service } from 'egg'
import { createMathExpr } from 'svg-captcha'

export default class Captcha extends Service {
  public async init() {
    const { ctx, app } = this
    const { token }: { token: string } = ctx.query
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
      await app.redis.set(`captcha:${newToken}`, text, app.config.base.redis.mode, 600)
      return {
        token: newToken,
        image: data
      }
    }

    if (token) {
      await app.redis.set(`captcha:${token}`, text, app.config.base.redis.mode, 600)
      return {
        token,
        image: data
      }
    }
  }
}
