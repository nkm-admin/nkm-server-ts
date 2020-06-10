// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportDictionary from '../../../app/model/dictionary';
import ExportResource from '../../../app/model/resource';
import ExportRole from '../../../app/model/role';
import ExportUser from '../../../app/model/user';

declare module 'egg' {
  interface IModel {
    Dictionary: ReturnType<typeof ExportDictionary>;
    Resource: ReturnType<typeof ExportResource>;
    Role: ReturnType<typeof ExportRole>;
    User: ReturnType<typeof ExportUser>;
  }
}
