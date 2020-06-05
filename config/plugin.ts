import { EggPlugin } from 'egg'

const plugin: EggPlugin = {
  sequelize: {
    enable: true,
    package: 'egg-sequelize'
  },

  redis: {
    enable: true,
    package: 'egg-redis'
  }
}

export default plugin
