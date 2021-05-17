import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg'

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + Date.now()

  // add your egg config in here
  config.middleware = ['errorHandler', 'validate']

  config.sequelize = {
    username: 'root',
    password: '123456',
    database: 'nkm_admin_test',
    host: '127.0.0.1',
    timezone: '+08:00',
    define: {
      timestamps: false,
      freezeTableName: true,
      underscored: false
    }
  }

  config.validate = {
    validateRoot: true
  }

  config.logger = {
    outputJSON: true,
    dir: `${appInfo.root}/logs/${appInfo.name}`
  }

  config.multipart = {
    mode: 'file'
  }

  config.redis = {
    client: {
      port: 6379,
      host: '127.0.0.1',
      password: '',
      db: 0
    }
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
