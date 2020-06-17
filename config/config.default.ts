import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg'

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1590136551626_8235'

  // add your egg config in here
  config.middleware = ['errorHandler', 'validate']

  config.sequelize = {
    username: 'root',
    password: '',
    database: 'nkm_admin',
    host: '127.0.0.1',
    timezone: '+08:00',
    define: {
      timestamps: false,
      freezeTableName: true
    }
  }

  config.validate = {
    validateRoot: true
  }

  config.multipart = {
    mode: 'file'
  }

  // the return config will combines to EggAppConfig
  return {
    ...config,
    base: {
      redis: {
        expire: 60 * 60,
        mode: 'EX'
      }
    }
  }
}
