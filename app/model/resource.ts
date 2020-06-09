export default function(app: any) {
  const { BIGINT, INTEGER, STRING } = app.Sequelize
  const Resource = app.model.define('nkm_resource', {
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
      type: INTEGER(10),
      allowNull: false,
      defaultValue: 1
    },
    path: {
      type: STRING,
      allowNull: false,
      defaultValue: ''
    },
    enable: {
      type: INTEGER(10),
      allowNull: false,
      defaultValue: 1
    },
    create_time: {
      type: BIGINT,
      allowNull: false
    },
    is_delete: {
      type: INTEGER(10),
      allowNull: false,
      defaultValue: 0
    }
  })

  return Resource
}
