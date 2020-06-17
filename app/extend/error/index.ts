interface ErrorMessage {
  [key: string]: {
    errorMsg: string;
    code: string;
  };
}

const common: ErrorMessage = {
  success: {
    errorMsg: '请求成功',
    code: '10000'
  },

  failed: {
    errorMsg: '请求失败',
    code: '10001'
  },

  serverError: {
    errorMsg: 'Server Error',
    code: '10002'
  },

  noToken: {
    errorMsg: '用户登录已过期',
    code: '10003'
  },

  noAuthority: {
    errorMsg: '暂无请求权限',
    code: '10004'
  },

  verificationFailed: {
    errorMsg: '参数校验失败',
    code: '10005'
  }
}

const login: ErrorMessage = {
  captchaError: {
    errorMsg: '验证码错误',
    code: '10010'
  },

  noUser: {
    errorMsg: '用户不存在',
    code: '10011'
  },

  passwordError: {
    errorMsg: '密码错误',
    code: '10012'
  },

  authorityError: {
    errorMsg: '该账号暂无访问权限',
    code: '10013'
  }
}

const user: ErrorMessage = {
  registeredFailed: {
    errorMsg: '用户创建失败',
    code: '20001'
  },

  userExists: {
    errorMsg: '用户已存在',
    code: '20002'
  },

  userNotExists: {
    errorMsg: '用户不存在',
    code: '20003'
  }
}

const resource: ErrorMessage = {
  exists: {
    errorMsg: '资源编码已存在',
    code: '20010'
  },

  notExists: {
    errorMsg: '资源不存在',
    code: '20011'
  }
}

const role: ErrorMessage = {
  exists: {
    errorMsg: '角色已存在',
    code: '20020'
  },

  notExists: {
    errorMsg: '角色不存在',
    code: '20021'
  }
}

const dictionary: ErrorMessage = {
  exists: {
    errorMsg: '字典已存在',
    code: '20020'
  },

  notExists: {
    errorMsg: '字典不存在',
    code: '20021'
  }
}

export default {
  common,
  login,
  user,
  resource,
  role,
  dictionary
}
