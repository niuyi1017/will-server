const schoolService = require('../services/schoolService')
const jwt = require('koa-jwt')
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
  schoolSpecials: async (ctx, next) => {
    console.log('controller')
    let code = 0
    let message = 'success'
    let result = {}
    let school_id = ctx.params.school_id
    try {
      result = await schoolService.schoolSpecials(school_id)
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
  getSchoolsByRank: async (ctx, next) => {
    let code = 0
    let message = 'success'
    let result = {}
    let rank = parseInt(ctx.request.query.rank)
    let province_id = parseInt(ctx.request.query.province_id)
    let subject_id = parseInt(ctx.request.query.subject_id)
    try {
      result = await schoolService.getSchoolsByRank(rank, province_id, subject_id)
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
  getSchoolsByScore: async (ctx, next) => {
    let code = 0
    let message = 'success'
    let result = {}
    let score = parseInt(ctx.request.query.score)
    let province_id = parseInt(ctx.request.query.province_id)
    let subject_id = parseInt(ctx.request.query.subject_id)
    // console.log(score,province_id,subject_id)
    try {
      result = await schoolService.getSchoolsByScore(score, province_id, subject_id )
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
}