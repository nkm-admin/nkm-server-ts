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
      defaultValue: ''
    },
    code: {
      type: STRING,
      defaultValue: ''
    },
    permission: {
      type: STRING,
      defaultValue: ''
    },
    create_time: BIGINT
  })

  Role.associate = () => {
    Role.belongsTo(app.model.User, {
      foreignKey: 'code',
      targetKey: 'role'
    })
  }

  return Role
}
