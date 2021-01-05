// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportBaseController from '../../../app/controller/BaseController';
import ExportCaptcha from '../../../app/controller/captcha';
import ExportLogin from '../../../app/controller/login';
import ExportLoginOut from '../../../app/controller/login_out';
import ExportUpload from '../../../app/controller/upload';
import ExportSystemDictionary from '../../../app/controller/system/dictionary';
import ExportSystemResource from '../../../app/controller/system/resource';
import ExportSystemRole from '../../../app/controller/system/role';
import ExportSystemUser from '../../../app/controller/system/user';

declare module 'egg' {
  interface IController {
    baseController: ExportBaseController;
    captcha: ExportCaptcha;
    login: ExportLogin;
    loginOut: ExportLoginOut;
    upload: ExportUpload;
    system: {
      dictionary: ExportSystemDictionary;
      resource: ExportSystemResource;
      role: ExportSystemRole;
      user: ExportSystemUser;
    }
  }
}
