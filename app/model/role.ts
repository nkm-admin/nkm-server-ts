import { Application } from 'egg'

export default function(app: Application) {
  const { INTEGER, STRING, BIGINT } = app.Sequelize
  const Role = app.model.define('role', {
    id: {
      type: INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: STRING,
      allowNull: false,
      defaultValue: ''
    },
    code: {
      type: STRING,
      allowNull: false,
      defaultValue: ''
    },
    permission: {
      type: STRING,
      allowNull: false,
      defaultValue: ''
    },
    create_time: {
      type: BIGINT,
      allowNull: false
    },
    is_deleted: {
      type: INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  })

  return class extends Role {
    static readonly tableName = 'nkm_role'

    static associate() {
      app.model.Role.belongsTo(app.model.User, {
        foreignKey: 'code',
        targetKey: 'role',
        as: 'u'
      })
    }
  }
}
