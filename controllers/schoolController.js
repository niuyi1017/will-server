const schoolService = require('../services/schoolService')
module.exports = {
  school: async (ctx, next) => {
    let code = 0
    let message = 'success'
    let result = {}
    try {
      result = await schoolService.school()
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
  schoollist: async (ctx, next) => {
    let code = 0
    let message = 'success'
    let result = {}
    try {
      result = await schoolService.schoollist()
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
  }
}