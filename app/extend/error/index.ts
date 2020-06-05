interface ErrorMessage {
  [key: string]: {
    errorMsg: string;
    code: string;
  };
}

const common: ErrorMessage = {
  noToken: {
    errorMsg: '用户登录已过期',
    code: '10000'
  },

  noAhthority: {
    errorMsg: '暂无请求权限',
    code: '10001'
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

export default {
  common,
  login
}
