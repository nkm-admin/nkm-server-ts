import { Application } from 'egg'
import { routerPrefix } from './settings'

export default (app: Application) => {
  const { controller, router } = app

  router.prefix(routerPrefix)

  router.post('/login', controller.login.login)

  router.post('/login-out', controller.loginOut.loginOut)

  router.post('/upload', controller.upload.upload)

  router.get('/system/user/list', controller.system.user.getUserList)
  router.post('/system/user/registered', controller.system.user.registered)
  router.post('/system/user/del', controller.system.user.del)
  router.post('/system/user/modify-role', controller.system.user.modifyRole)
  router.post('/system/user/reset-password', controller.system.user.resetPassword)
  router.post('/system/user/modify-password', controller.system.user.modifyPassword)

  router.post('/system/resource/save', controller.system.resource.save)
  router.post('/system/resource/del', controller.system.resource.del)
  router.get('/system/resource/tree', controller.system.resource.getTree)

  router.get('/system/role/list', controller.system.role.getList)
  router.post('/system/role/save', controller.system.role.save)
  router.post('/system/role/del', controller.system.role.del)

  router.get('/system/dictionary/tree', controller.system.dictionary.getTree)
  router.post('/system/dictionary/save', controller.system.dictionary.save)
  router.post('/system/dictionary/del', controller.system.dictionary.del)

  router.get('/captcha', controller.captcha.init)
}
