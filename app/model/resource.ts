import { Application } from 'egg'

export default function(app: Application) {
  const { BIGINT, INTEGER, STRING } = app.Sequelize
  const Resource = app.model.define('resource', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    code: {
      type: STRING,
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: STRING,
      allowNull: false
    },
    type: {
      type: STRING(50),
      allowNull: false
    },
    parent_id: {
      type: INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    parent_code: {
      type: STRING,
      allowNull: false,
      defaultValue: ''
    },
    icon: {
      type: STRING,
      allowNull: false,
      defaultValue: ''
    },
    sort: {
      type: INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    path: {
      type: STRING,
      allowNull: false,
      defaultValue: ''
    },
    enabled: {
      type: INTEGER,
      allowNull: false,
      defaultValue: 1
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

  return class extends Resource {
    static readonly tableName = 'nkm_resource'
  }
}
