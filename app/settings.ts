// 用于加密安全key
export const SECRET_KEY = '@$!nkm-123456'

// 路由前缀
export const ROUTER_PREFIX = '/api/nkm-admin'

// 新用户默认角色编码
export const DEFAULT_RULE_CODE = 'test'

// 默认分页量
export const DEFAULT_PAGE_LIMIT = 10

// 默认密码
export const DEFAULT_PASSWORD = 'nkm-123456'

// 系统管理员角色编码
export const SYSTEM_ADMINISTRATOR_CODE = 'systemAdministrator'

// 不需要登录授权的接口
export const IGNORE_LOGIN_ROUTES = [
  new RegExp(`${ROUTER_PREFIX}/login$`),
  new RegExp(`${ROUTER_PREFIX}/login-out$`),
  new RegExp(`${ROUTER_PREFIX}/captcha(\\?.*)?$`),
  new RegExp(`${ROUTER_PREFIX}/readfile(\\?.*)?$`),
  new RegExp(`${ROUTER_PREFIX}/system/user/registered`)
]

// 无需授权的路由
export const NO_AUTHORIZATION_REQUIRED_ROUTES = [
  `${ROUTER_PREFIX}/upload`,
  `${ROUTER_PREFIX}/system/dictionary/tree`,
  `${ROUTER_PREFIX}/system/user/modify-password`,
  `${ROUTER_PREFIX}/system/user/update-info`,
  `${ROUTER_PREFIX}/system/resource/tree`,
  `${ROUTER_PREFIX}/system/role/list`,
  `${ROUTER_PREFIX}/tags/list`,
  `${ROUTER_PREFIX}/tags/save`,
  `${ROUTER_PREFIX}/tags/del`
]
