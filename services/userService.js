const userDao = require('../dao/user')
const { sign } = require('jsonwebtoken')
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
  signIn: async (username, password) => {
    let result = {}
    try {
      isMatch = await userDao.signIn(username, password)
      if(isMatch){
        const token = sign({name: username}, 'will', { expiresIn: 60 * 60 })
        console.log(token)
        result.token = token
      }
      return result
    } catch (error) {
      return new Error(error)
    }
  }
}