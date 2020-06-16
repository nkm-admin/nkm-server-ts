// 路由前缀
export const ROUTER_PREFIX = '/api/nkm-admin'

// 默认分页量
export const DEFAULT_PAGE_LIMIT = 10

// 默认密码
export const DEFAULT_PASSWORD = 'nkm-123456'

// 不需要登录授权的接口
export const IGNORE_ROUTES = [
  new RegExp(`${ROUTER_PREFIX}/login$`),
  new RegExp(`${ROUTER_PREFIX}/login-out$`),
  new RegExp(`${ROUTER_PREFIX}/captcha(\\?.*)?$`),
  new RegExp(`${ROUTER_PREFIX}/readfile(\\?.*)?$`)
]
