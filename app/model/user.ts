export default function(app: any) {
  const { STRING, BIGINT, INTEGER } = app.Sequelize

  const User = app.model.define('nkm_users', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user_login_name: {
      type: STRING(60),
      allowNull: false
    },
    user_password: {
      type: STRING,
      allowNull: false
    },
    display_name: {
      type: STRING(60),
      allowNull: false
    },
    user_email: {
      type: STRING(100),
      allowNull: false
    },
    role: {
      type: STRING(50),
      allowNull: false
    },
    user_registered: BIGINT,
    last_login_time: BIGINT,
    user_status: {
      type: INTEGER,
      defaultValue: 1
    },
    is_system_admin: {
      type: INTEGER,
      defaultValue: 0
    },
    avatar: {
      type: STRING,
      allowNull: false
    },
    user_agent: {
      type: STRING,
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
