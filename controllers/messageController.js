const messageService = require('../services/messageService')
module.exports = {
  notifications: async (ctx, next) => {
    let uid = ctx.request.query.uid
    let code = 0
    let message = 'success'
    let result = []
    let page = 0
    let num = 20
    if (ctx.request.query.page) {
      page = parseInt(ctx.request.query.page)
    }
    if (ctx.request.query.num) {
      num = parseInt(ctx.request.query.num)
    }
    try {
      result = await messageService.notifications(uid, page, num)
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
  },
}