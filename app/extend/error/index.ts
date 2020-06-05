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

  noToken: {
    errorMsg: '用户登录已过期',
    code: '10002'
  },

  noAhthority: {
    errorMsg: '暂无请求权限',
    code: '10003'
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
    errorMsg: '权限查找失败',
    code: '10013'
  }
}

const user: ErrorMessage = {
  registeredFailed: {
    errorMsg: '用户创建失败',
    code: '20001'
  },

  userExists: {
    errorMsg: '用户名已存在',
    code: '20002'
  }
}

export default {
  common,
  login,
  user
}
