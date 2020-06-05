const routerPrefix = '/api/nkm-admin'

export { routerPrefix }

export const ignoreRoutes = [
  /^\/api\/nkm-admin\/?$/,
  /^\/api\/nkm-admin\/login$/,
  /^\/api\/nkm-admin\/captcha(\?.*)?$/,
  /^\/upload/
]
