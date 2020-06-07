const routerPrefix = '/api/nkm-admin'

export { routerPrefix }

// 默认分页量
export const DEFAULT_PAGE_LIMIT = 10

// 默认密码
export const DEFAULT_PASSWORD = 'nkm-123456'

export const ignoreRoutes = [
  /^\/api\/nkm-admin\/?$/,
  /^\/api\/nkm-admin\/login$/,
  /^\/api\/nkm-admin\/captcha(\?.*)?$/,
  /^\/upload/
]
