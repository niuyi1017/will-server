const questionService = require('../services/questionService')
module.exports = {
  newQuestion: async (ctx, next) => {
    let code = 0
    let message = 'success'
    let result = {}
    let question = ctx.request.body
    try {
      console.log(question)
      result = await questionService.newQuestion(question)
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