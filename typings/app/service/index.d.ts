// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
type AnyClass = new (...args: any[]) => any;
type AnyFunc<T = any> = (...args: any[]) => T;
type CanExportFunc = AnyFunc<Promise<any>> | AnyFunc<IterableIterator<any>>;
type AutoInstanceType<T, U = T extends CanExportFunc ? T : T extends AnyFunc ? ReturnType<T> : T> = U extends AnyClass ? InstanceType<U> : U;
import ExportCaptcha from '../../../app/service/captcha';
import ExportLogin from '../../../app/service/login';
import ExportLoginOut from '../../../app/service/loginOut';
import ExportSystemResource from '../../../app/service/system/resource';
import ExportSystemUser from '../../../app/service/system/user';

declare module 'egg' {
  interface IService {
    captcha: AutoInstanceType<typeof ExportCaptcha>;
    login: AutoInstanceType<typeof ExportLogin>;
    loginOut: AutoInstanceType<typeof ExportLoginOut>;
    system: {
      resource: AutoInstanceType<typeof ExportSystemResource>;
      user: AutoInstanceType<typeof ExportSystemUser>;
    }
  }
}
