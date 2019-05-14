const commentService = require('../services/commentService')
module.exports = {
  newComment: async (ctx, next) => {
    let code = 0
    let message = 'success'
    let result = {}
    let comment = ctx.request.body.comment
    let recentlyMoment = ctx.request.body.recentlyMoment
    try {
      result = await commentService.newComment(comment, recentlyMoment)
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