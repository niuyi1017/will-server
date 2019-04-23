const userDao = require('../dao/user')
const { sign } = require('jsonwebtoken')
const secret = 'will'
module.exports = {
  signUp: async (user) => {
    let result = {}
    try {
      result = await userDao.signUp(user)
      return result
    } catch (error) {
      return new Error(error) 
    }
  },
  signIn: async (phoneNumber, password) => {
    let result = {}
    try {
      console.log(phoneNumber)
      result = await userDao.signIn(phoneNumber, password)
      console.log(result)
      if (result.match){
        const token = sign({ name: phoneNumber }, secret, { expiresIn: 7*24*60*60*1000 })
        console.log(token)
        result.token = token
      }else{
        result.code = -1
        result.message = "账号或密码不匹配"
      }
      return result
    } catch (error) {
      return new Error(error)
    }
  },
  users: async (page, num) => {
    let result = await userDao.users(page, num)
    return result
  }
}