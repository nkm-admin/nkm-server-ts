import BaseController from './BaseController'

export default class Upload extends BaseController {
  public async upload() {
    const data = await this.ctx.service.upload.upload()
    this.ctx.body = this.success({
      data
    })
  }

  public async readFile() {
    const { ctx } = this
    const {
      stream,
      filename
    } = await this.ctx.service.upload.readFile()
    ctx.attachment(filename)
    ctx.body = stream
  }
}
