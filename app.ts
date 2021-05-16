import { Application } from 'egg'
import validator from './app/validator'

class AppBootHook {
  private app: Application
  constructor(app: Application) {
    this.app = app
  }

  // 配置文件即将加载
  configWillLoad() {
    console.log('配置文件即将加载')
  }

  configDidLoad() {
    console.log('配置文件加载完成')
  }

  didLoad() {
    console.log('文件加载完成')
  }

  // 插件启动完毕
  async willReady() {
    for (const [_k, _v] of Object.entries(validator)) {
      this.app.validator.addRule(_k, (...[, value]) => _v(value))
    }
    console.log('插件启动完毕')
  }

  serverDidReady() {
    console.log('应用启动完成')
  }
}

module.exports = AppBootHook
