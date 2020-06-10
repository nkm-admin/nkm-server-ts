export default function(app: any) {
  const { INTEGER, STRING, BIGINT } = app.Sequelize
  const Role = app.model.define('nkm_role', {
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
    is_delete: {
      type: INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  })

  Role.associate = () => {
    Role.belongsTo(app.model.User, {
      foreignKey: 'code',
      targetKey: 'role'
    })
  }

  return Role
}
