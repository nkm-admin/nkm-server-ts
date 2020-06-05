import { Application } from 'egg'
import { routerPrefix } from './settings'

export default (app: Application) => {
  const { controller, router } = app

  router.prefix(routerPrefix)

  router.post('/login', controller.login.login)

  router.get('/user/list', controller.user.getUserList)

  router.post('/user/registered', controller.user.registered)

  router.get('/captcha', controller.captcha.init)
}
