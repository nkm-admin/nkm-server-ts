export default {
  password: (value: string) => {
    const min = 6
    const max = 16
    if (value.length < min) return `密码长度不能少于${min}位`
    if (value.length > max) return `密码长度不能大于${max}位`
    if (!/^[a-z\d,./!@#$*&-]+$/i.test(value)) return '密码格式错误'
  },

  loginName: (value: string) => {
    if (!/^[a-z\d]+$/i.test(value)) return '账号格式错误'
  },

  name: (value: string) => {
    if (!/^[a-z\d\u2E80-\u9FFF]+$/i.test(value)) return '名称格式错误'
  },

  email: (value: string) => {
    if (!/^(\w+|\w+(\.\w+))+@(\w+\.)+\w+$/.test(value)) return '邮箱格式错误'
  },

  code: (value: string) => {
    if (!/^[a-z\d:-_]+$/.test(value)) return '编码格式错误'
  }
}
