const commentService = require('../services/commentService')
module.exports = {
  newComment: async (ctx, next) => {
    let code = 0
    let message = 'success'
    let result = {}
    let comment = ctx.request.body.comment
    let recentlyMoment = ctx.request.body.recentlyMoment
    let notification = ctx.request.body.notification
    // console.log(123,recentlyMoment)
    // console.log(456,notification)
    try {
      result = await commentService.newComment(comment, recentlyMoment, notification)
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
  newReply: async (ctx, next) => {
    let code = 0
    let message = 'success'
    let result = {}
    let reply = ctx.request.body.reply
    let recentlyMoment = ctx.request.body.recentlyMoment
    let notification = ctx.request.body.notification
    try {
      result = await commentService.newReply(reply, recentlyMoment, notification)
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