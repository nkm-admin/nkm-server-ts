import { Application } from 'egg'
import validator from './validator'

class AppBootHook {
  private app: Application
  constructor(app: Application) {
    this.app = app
  }

  // 配置文件即将加载
  configWillLoad() {
    console.log('配置文件即将加载')
  }

  // 插件启动完毕
  async willReady() {
    for (const [_k, _v] of Object.entries(validator)) {
      this.app.validator.addRule(_k, (...[, value]) => _v(value))
    }
  }
}

module.exports = AppBootHook
