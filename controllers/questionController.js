const questionService = require('../services/questionService')
module.exports = {
  newQuestion: async (ctx, next) => {
    let code = 0
    let message = 'success'
    let result = {}
    let question = ctx.request.body
    try {
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
  questions: async (ctx, next) => {
    let code = 0
    let message = 'success'
    let result = {}
    let page = 0
    let num = 20

    if (ctx.request.query.page) {
      page = parseInt(ctx.request.query.page)
    }
    if (ctx.request.query.num) {
      num = parseInt(ctx.request.query.num)
    }

    try {
      result = await questionService.questions(page, num)
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
  question: async (ctx, next) => {
    let code = 0
    let message = 'success'
    let result = {}
    let question_id = ctx.params.question_id
    try {
      result = await questionService.question(question_id)
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
  favour: async (ctx, next) => {
    let code = 0
    let message = 'success'
    let result = {}
    let { question_id, uid }= ctx.request.body
    console.log(question_id, uid)
    try {
      result = await questionService.favour(question_id, uid)
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
  cancelFavour: async (ctx, next) => {
    let code = 0
    let message = 'success'
    let result = {}
    let { question_id, uid } = ctx.request.body
    console.log(question_id, uid)
    try {
      result = await questionService.cancelFavour(question_id, uid)
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