const willService = require('../services/willService')
module.exports = {
  slideShows: async (ctx, next) => {
    let data = await willService.slideShows()
    await next()
    ctx.response.body = {
      code: 0,
      data
    }
  },
  hotArticles: async (ctx, next) => {
    let data = await willService.hotArticles()
    await next()
    ctx.response.body = {
      code: 0,
      data
    }
  },
  recommendArticles: async (ctx, next) => {
    let data = await willService.recommedArticles()
    await next()
    ctx.response.body = {
      code: 0,
      data
    }
  },
  recommendPeople: async (ctx, next) => {
    let data = await willService.recommendPeople()
    await next()
    ctx.response.body = {
      code: 0,
      data
    }
  }
}