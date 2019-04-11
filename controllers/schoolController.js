const schoolService = require('../services/schoolService')
module.exports = {
  school: async (ctx, next) => {
    let code = 0
    let message = 'success'
    let result = {}
    let school_id = ctx.params.school_id
    try {
      result = await schoolService.school(school_id)
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
  schoolDetail: async (ctx, next) => {
    let code = 0
    let message = 'success'
    let result = {}
    let school_id = ctx.params.school_id
    try {
      result = await schoolService.schoolDetail(school_id)
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
  schools: async (ctx, next) => {
    let code = 0
    let message = 'success'
    let result = {}
    let page = 0
    let num = 20
    
    if (ctx.request.query.page){
      page = parseInt(ctx.request.query.page)
    }
    if (ctx.request.query.num) {
      num = parseInt(ctx.request.query.num)
    }
    
    try {
      result = await schoolService.schools(page, num)
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
  allSchool: async (ctx, next) => {
    console.log('controller')
    let code = 0
    let message = 'success'
    let result = {}
    try {
      result = await schoolService.allSchool()
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
      result = await schoolService.allSpecial()
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