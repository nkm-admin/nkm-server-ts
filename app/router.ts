import { Application } from 'egg'
import { routerPrefix } from './settings'

export default (app: Application) => {
  const { controller, router } = app

  router.prefix(routerPrefix)

  router.post('/login', controller.login.login)

  router.post('/login-out', controller.loginOut.loginOut)

  router.get('/system/user/list', controller.system.user.getUserList)
  router.post('/system/user/registered', controller.system.user.registered)
  router.post('/system/user/del', controller.system.user.del)
  router.post('/system/user/modify-role', controller.system.user.modifyRole)
  router.post('/system/user/reset-password', controller.system.user.resetPassword)
  router.post('/system/user/modify-password', controller.system.user.modifyPassword)

  router.post('/system/resource/save', controller.system.resource.create)
  router.post('/system/resource/del', controller.system.resource.del)
  router.get('/system/resource/tree', controller.system.resource.getTree)

  router.get('/system/role/list', controller.system.role.getList)
  router.post('/system/role/save', controller.system.role.save)

  router.get('/captcha', controller.captcha.init)
}
