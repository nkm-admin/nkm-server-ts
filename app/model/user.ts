export default function(app: any) {
  const { STRING, BIGINT, INTEGER } = app.Sequelize

  const User = app.model.define('nkm_users', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    login_name: {
      type: STRING(60),
      allowNull: false
    },
    password: {
      type: STRING,
      allowNull: false
    },
    display_name: {
      type: STRING(60),
      allowNull: false
    },
    email: {
      type: STRING(100),
      defaultValue: '',
      allowNull: false
    },
    role: {
      type: STRING(50),
      allowNull: false
    },
    registered_time: BIGINT,
    last_login_time: BIGINT,
    status: {
      type: INTEGER,
      defaultValue: 1
    },
    is_system_admin: {
      type: INTEGER,
      defaultValue: 0
    },
    avatar: {
      type: STRING,
      allowNull: false,
      defaultValue: ''
    },
    agent: {
      type: STRING,
      allowNull: false,
      defaultValue: ''
    }
  })

  User.associate = () => {
    User.belongsTo(app.model.Role, {
      foreignKey: 'role',
      targetKey: 'code',
      as: 'r'
    })
  }

  return User
}
