import errorMessage from './error'

interface Response {
  data?: any;
  message?: string;
  success?: boolean;
  code?: string;
  count?: number;
}

export default {
  errorMsg: errorMessage,

  // 请求返回结构
  responseStruc(res: Response = {}): Response {
    return {
      data: null,
      success: true,
      count: 0,
      message: errorMessage.common.success.errorMsg,
      code: errorMessage.common.success.code,
      ...res
    }
  }
}
