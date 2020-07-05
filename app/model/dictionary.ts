import { Application } from 'egg'

export default function(app: Application) {
  const { BIGINT, INTEGER, STRING } = app.Sequelize
  const Dictionary = app.model.define('dictionary', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: STRING(50),
      allowNull: false
    },
    code: {
      type: STRING(50),
      allowNull: false
    },
    value: {
      type: STRING(50),
      allowNull: false,
      defaultValue: ''
    },
    parent_id: {
      type: BIGINT,
      allowNull: false,
      defaultValue: 0
    },
    sort: {
      type: INTEGER,
      allowNull: false,
      defaultValue: 0
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

  return class extends Dictionary {
    static readonly tableName = 'nkm_dictionary'
  }
}
