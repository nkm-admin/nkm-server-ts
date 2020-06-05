// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportBaseController from '../../../app/controller/BaseController';
import ExportCaptcha from '../../../app/controller/captcha';
import ExportLogin from '../../../app/controller/login';
import ExportUser from '../../../app/controller/user';

declare module 'egg' {
  interface IController {
    baseController: ExportBaseController;
    captcha: ExportCaptcha;
    login: ExportLogin;
    user: ExportUser;
  }
}
