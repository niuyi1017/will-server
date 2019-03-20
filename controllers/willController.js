const willService = require('../services/willService')
module.exports = {
  slideShows: async (ctx, next) => {
    let code = 0
    let message = "success"
    let data = {}
    try {
      data = await willService.slideShows()
      await next()
    } catch (error) {
      code = 0
      message = error.message
    }
    ctx.response.body = {
      code,
      message,
      data
    }
  },
  hotArticles: async (ctx, next) => {
    let code = 0
    let message = "success"
    let data = {}
    try {
      data = await willService.hotArticles()
      await next()
    } catch (error) {
      code = 0
      message = error.message
    }
    ctx.response.body = {
      code,
      message,
      data
    }
  },
  recommendArticles: async (ctx, next) => {
    let uid = ctx.request.query.uid
    let code = 0
    let message = "success"
    let data = {}
    try {
      data = await willService.recommedArticles(uid)
      await next()
    } catch (error) {
      code = 1
      message = error.message
    }
    ctx.response.body = {
      code,
      message,
      data
    }
    
  },
  recommendPeople: async (ctx, next) => {
    let uid = ctx.request.query.uid
    let code = 0
    let message = "success"
    let data = {}
    try {
      data = await willService.recommendPeople(uid)
      await next()
    } catch (error) {
      code = 1
      message = error.message
    }
    ctx.response.body = {
      code,
      data,
      message
    }
  },
  will: async (ctx, next) => {
    let uid = ctx.request.query.uid
    let code = 0
    let message = "success"
    let data = []
    try {
      data = {
        slideShows: await willService.slideShows(),
        recommendPeople: await willService.recommendPeople(uid),
        recommedArticles: await willService.recommedArticles(uid),
        hotArticles: await willService.hotArticles()
      }
      await next()
    } catch (error) {
      code = 1
      message = error.message
    }
    ctx.response.body = {
      code,
      data,
      message
    }
  },
}