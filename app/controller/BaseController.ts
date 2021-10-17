import { Controller } from 'egg'
import { objectKeyToCamelCase } from '@xuanmo/javascript-utils'

export default class BaseController extends Controller {
  public success(response: {
    data?: any;
    message?: string;
    success?: boolean;
    code?: string;
    count?: number;
  } = {}) {
    return {
      ...this.ctx.responseStruc(),
      ...response,
      data: objectKeyToCamelCase(response.data, 'dataValues')
    }
  }

  public fail(response: Response) {
    return {
      ...this.ctx.responseStruc(this.ctx.errorMsg.common.failed),
      ...response,
      success: false
    }
  }
}
