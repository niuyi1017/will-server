const userService = require('../services/userService')
module.exports = {
  signUp: async (ctx, next) => {
    let {username, password} = ctx.request.body
    console.log(username,password)
    let result = await userService.signUp(username, password)
    await next()
    ctx.response.body = {
      code: 0,
      data: result
    }
  }
}