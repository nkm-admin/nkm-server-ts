export default function(app: any) {
  const { BIGINT, INTEGER, STRING } = app.Sequelize
  const Dictionary = app.model.define('nkm_dictionary', {
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
      type: INTEGER(30),
      allowNull: false,
      defaultValue: 0
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

  return Dictionary
}
