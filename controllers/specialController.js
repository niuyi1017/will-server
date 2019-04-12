const specialService = require('../services/specialService')
module.exports = {
  special: async (ctx, next) => {
    let code = 0
    let message = 'success'
    let result = {}
    let special_id = ctx.params.special_id
    try {
      result = await specialService.special(special_id)
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
  specialDetail: async (ctx, next) => {
    let code = 0
    let message = 'success'
    let result = {}
    let special_id = ctx.params.special_id
    try {
      result = await specialService.specialDetail(special_id)
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
  specials: async (ctx, next) => {
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
      result = await specialService.specials(page, num)
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
  allSpecial: async (ctx, next) => {
    console.log('controller')
    let code = 0
    let message = 'success'
    let result = {}
    try {
      result = await specialService.allSpecial()
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