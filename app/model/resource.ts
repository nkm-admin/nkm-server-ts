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
      allowNull: true
    },
    name: {
      type: STRING,
      allowNull: true
    },
    type: {
      type: STRING(50),
      allowNull: true
    },
    parent_id: {
      type: INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    parent_code: {
      type: STRING,
      allowNull: true,
      defaultValue: ''
    },
    icon: {
      type: STRING,
      allowNull: true,
      defaultValue: ''
    },
    sort: {
      type: INTEGER(10),
      allowNull: true,
      defaultValue: 1
    },
    path: {
      type: STRING,
      allowNull: true,
      defaultValue: ''
    },
    enable: {
      type: INTEGER(10),
      allowNull: true,
      defaultValue: 1
    },
    create_time: {
      type: BIGINT,
      allowNull: true
    },
    is_delete: {
      type: INTEGER(10),
      allowNull: true,
      defaultValue: 0
    }
  })

  return Resource
}
