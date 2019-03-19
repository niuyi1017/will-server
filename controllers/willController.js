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
    let uid = ctx.request.query.uid
    let data = await willService.recommedArticles(uid)
    await next()
    ctx.response.body = {
      code: 0,
      data
    }
  },
  recommendPeople: async (ctx, next) => {
    let uid = ctx.request.query.uid
    let data = await willService.recommendPeople(uid)
    await next()
    ctx.response.body = {
      code: 0,
      data
    }
  },
  will: async (ctx, next) => {
    uid = ctx.request.query.uid
    let data = {
      slideShows: await willService.slideShows(),
      recommendPeople: await willService.recommendPeople(uid),
      recommedArticles: await willService.recommedArticles(uid),
      hotArticles: await willService.hotArticles()
    }
    await next()
    ctx.response.body = {
      code: 0,
      data
    }
  },
}