const willService = require('../services/willService')
module.exports = {
  index: async (ctx, next) => {
    let data = willService.index()
    await next()
    ctx.response.body = data
  }
}