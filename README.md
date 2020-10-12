# 后台服务端

- 技术栈：Nodejs+Eggjs+Typescript+Mysql+Redis
- 接口文档都在[nkm-admin.postman_collection.json](./nkm-admin.postman_collection.json)文件，导入到postman即可
- 数据库导入[nkm_admin.sql](./nkm_admin.sql)文件
- 管理员用户账号密码：admin/123456
- 其他配置参考eggjs文档[https://eggjs.org/zh-cn/basics/structure.html](https://eggjs.org/zh-cn/basics/structure.html)

## 用户角色权限说明
1. 新增资源
1. 新增角色然后角色关联资源
1. 新增用户然后用户关联角色（目前已实现单用户多角色功能）

## QuickStart

### Development

```bash
$ npm i
$ npm run dev
$ open http://localhost:7001/
```

Don't tsc compile at development mode, if you had run `tsc` then you need to `npm run clean` before `npm run dev`.

### Deploy

```bash
$ npm run tsc
$ npm start
```

### Npm Scripts

- Use `npm run lint` to check code style
- Use `npm test` to run unit test
- se `npm run clean` to clean compiled js at development mode once

### Requirement

- Node.js 8.x
- Typescript 2.8+
