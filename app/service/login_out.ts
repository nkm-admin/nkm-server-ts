import { Service } from 'egg'

export default class LoginOut extends Service {
  public async loginOut(token: string) {
    return this.app.redis.del(token)
  }
}
