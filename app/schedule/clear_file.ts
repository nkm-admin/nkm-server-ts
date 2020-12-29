import { Subscription } from 'egg'
import fs = require('fs')
import path = require('path')

export default class ClearFile extends Subscription {
  static get schedule() {
    return {
      cron: '0 0 0 * * 1',
      type: 'all'
    }
  }

  async subscribe() {
    const { app, ctx } = this
    const files = await app.redis.lrange('files', 0, -1)
    if (ctx.helper.isEmpty(files)) return
    files.forEach((item: string) => {
      try {
        fs.unlinkSync(path.join(__dirname, '../public', item))
        app.redis.lrem('files', 0, item)
      } catch (err) {
        app.logger.error(`[定时任务-文件清理] ${err}`)
      }
    })
  }
}
