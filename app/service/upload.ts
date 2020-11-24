import { Service } from 'egg'
import path = require('path')
import fs = require('fs')
import { ROUTER_PREFIX } from '../settings'

interface FileResponse {
  url: string;
  name: string;
  type: string;
}

export default class extends Service {
  public async upload() {
    const { ctx } = this
    // 存放文件的目录
    const dir = path.join(__dirname, '../public/upload')

    const year = ctx.datejs().format('yyyy')
    const month = ctx.datejs().format('MM')

    // 文件上传类型
    const dirType = ['account', 'editor']
    const fileType = dirType.indexOf(ctx.request.body.type) === -1 ? '' : ctx.request.body.type

    // 判断目录是否存在
    !fs.existsSync(dir) && fs.mkdirSync(dir)
    !fs.existsSync(`${dir}/${year}`) && fs.mkdirSync(`${dir}/${year}`)
    !fs.existsSync(`${dir}/${year}/${month}`) && fs.mkdirSync(`${dir}/${year}/${month}`)
    !fs.existsSync(`${dir}/${year}/${month}/${fileType}`) && fs.mkdirSync(`${dir}/${year}/${month}/${fileType}`)

    const writeDir = `${dir}/${year}/${month}/${fileType}`

    const files: FileResponse[] = []
    for (let i = 0; i < ctx.request.files.length; i++) {
      const file = ctx.request.files[i]
      // 创建可读流
      const reader = fs.createReadStream(file.filepath)

      // 获取上传文件扩展名
      const ext = file.filename.split('.').pop()

      // 文件名
      const filename = `${ctx.datejs().format('yyyyMMddHHmmss')}${Math.random().toString().substring(2, 8)}.${ext}`

      // 创建可写流
      const upStream = fs.createWriteStream(`${writeDir}/${filename}`)
      const remoteAddress = `${ROUTER_PREFIX}/readfile?path=/upload/${year}/${month}/${fileType}/${filename}`

      // 可读流通过管道写入可写流
      reader.pipe(upStream)

      files.push({
        url: remoteAddress,
        type: file.mime,
        name: filename
      })
    }

    return files
  }

  public async readFile() {
    try {
      const { ctx } = this
      const stream = fs.createReadStream(path.join(__dirname, `../public/${ctx.request.query.path}`))
      return {
        stream,
        filename: stream.path.toString().replace(/([a-z\d]+\.[a-z\d]+)$/, '$1')
      }
    } catch (err) {
      this.ctx.logger.error('[文件读取失败]', JSON.stringify(err || {}))
    }
  }
}
