const articleService = require('../services/articleService')
module.exports = {
  newArticle: async (ctx, next) => {
    let code = 0
    let message = 'success'
    let result = {}
    let article = ctx.request.body
    
    try {
      result = await articleService.newArticle(article)
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
  articles: async (ctx, next) => {
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
      result = await articleService.articles( page, num)
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
  article: async (ctx, next) => {
    let code = 0
    let message = 'success'
    let result = {}
    let article_id = ctx.params.article_id
    try {
      result = await articleService.article(article_id)
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