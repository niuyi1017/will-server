const momentService = require('../services/momentService')
module.exports = {
  newMoment: async (ctx, next) => {
    let code = 0
    let message = 'success'
    let result = {}
    let moment = ctx.request.body.postContent
    let recentlyMoment = ctx.request.body.recentlyMoment
    try {
      result = await momentService.newMoment(moment, recentlyMoment)
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
  moments: async (ctx, next) => {
    let code = 0
    let message = 'success'
    let result = {}
    let page = 0
    let num = 20
    let uid = ctx.uid
    if (ctx.request.query.page) {
      page = parseInt(ctx.request.query.page)
    }
    if (ctx.request.query.num) {
      num = parseInt(ctx.request.query.num)
    }

    try {
      result = await momentService.moments(uid,page, num)
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
  moment: async (ctx, next) => {
    let code = 0
    let message = 'success'
    let result = {}
    let moment_id = ctx.params.moment_id
    try {
      result = await momentService.moment(moment_id)
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
    let { moment_id, uid } = ctx.request.body
    console.log(moment_id, uid)
    try {
      result = await momentService.favour(moment_id, uid)
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
    let { moment_id, uid } = ctx.request.body
    console.log(moment_id, uid)
    try {
      result = await momentService.cancelFavour(moment_id, uid)
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
  like: async (ctx, next) => {
    let code = 0
    let message = 'success'
    let result = {}
    let { moment_id, from, to, recentlyMoment, notification } = ctx.request.body
    try {
      result = await momentService.like(moment_id, from, to, recentlyMoment, notification)
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
  cancelLike: async (ctx, next) => {
    let code = 0
    let message = 'success'
    let result = {}
    let { moment_id, from, to, recentlyMoment } = ctx.request.body
    try {
      result = await momentService.cancelLike(moment_id, from, to, recentlyMoment)
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