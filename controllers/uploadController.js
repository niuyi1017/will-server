const uploadService = require('../services/uploadService')
module.exports = {
  createSk: async (ctx, next) => {
    let user = ctx.request.body
    let code = 0
    let message = 'success'
    let result = []
    try {
      result = await uploadService.createSk(user)
      // code = result.code,
      // message = result.msg
      await next()
    } catch (error) {
      code = 1
      message = error.message
    }
    ctx.response.body = {
      code,
      data: result,
      message
    }
  }
}