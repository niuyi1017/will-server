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
    let { username, password } = ctx.request.body
    password = password + ''
    let code = 0
    let message = 'success'
    let result = {}
    try {
      result = await userService.signIn(username, password)
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