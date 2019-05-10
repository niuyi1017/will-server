const userService = require('../services/userService')
module.exports = {
  signUp: async (ctx, next) => {
    let user = ctx.request.body
    let code = 0
    let message = 'success'
    let result = [] 
    try {
      result = await userService.signUp(user)
      code = result.code,
      message = result.msg
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
  signIn: async (ctx, next) => {
    let { phoneNumber, password } = ctx.request.body
    password = password + ''
    let code = 0
    let message = 'success'
    let result = {}
    try {
      result = await userService.signIn(phoneNumber, password)
      await next()
    } catch (error) {
      code = 1
      message = error.message
    }
    if(result.token){
      ctx.response.body = {
        code,
        data: result,
        message
      }
    }else{
      ctx.response.body = {
        code: result.code,
        data: result.data,
        message: result.message
      }
    }
  },
  users: async (ctx, next) => {
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
      result = await userService.users(page, num)
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
  user: async (ctx, next) => {
    let code = 0
    let message = 'success'
    let result = {}
    let uid = ctx.params.uid
    try {
      result = await userService.user(uid)
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
  userRecentlyMoments: async (ctx, next) => {
    let code = 0
    let message = 'success'
    let result = {}
    let uid = ctx.request.query.uid
    try {
      result = await userService.userRecentlyMoments(uid)
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
  userFollow: async (ctx, next) => {
    let { from, to, recentlyMoment} = ctx.request.body
    let code = 0
    let message = 'success'
    let result = {}
    try {
      result = await userService.userFollow(from, to, recentlyMoment)
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