class DateJS {
  private date: Date;
  constructor(date: Date | number) {
    this.date = new Date(date)
  }

  // 小于10的填充0补位
  private _paddingZero(n: number) {
    return n < 10 ? `0${n}` : n
  }

  public format(fmt = 'yyyy-MM-dd HH:mm:ss') {
    const obj = {
      'y+': this.date.getFullYear(),
      'M{2}': this._paddingZero(this.date.getMonth() + 1),
      'd{2}': this._paddingZero(this.date.getDate()),
      'H{2}': this._paddingZero(this.date.getHours()),
      'h{2}': this._paddingZero(this.date.getHours() % 12),
      'm{2}': this._paddingZero(this.date.getMinutes()),
      's{2}': this._paddingZero(this.date.getSeconds()),
      M: this.date.getMonth() + 1,
      d: this.date.getDate(),
      H: this.date.getHours(),
      h: this.date.getHours() % 12,
      m: this.date.getMinutes(),
      s: this.date.getSeconds(),
      W: this.date.getDay()
    }
    Object.keys(obj).forEach(key => {
      const regexp = new RegExp(`(${key})([^a-zA-Z])?`)
      if (regexp.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, obj[key])
      }
    })
    return fmt
  }
}

const datejs = (date: Date | number = Date.now()) => new DateJS(date)

export default datejs
