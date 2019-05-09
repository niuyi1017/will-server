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
      result = await userDao.signIn(phoneNumber, password)
      if (result.match){
        const uid = result.uid
        const token = sign({ uid }, secret, { expiresIn: 7*24*60*60*1000 })
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
  },
  user: async (uid) => {
    let result = await userDao.user(uid)
    return result
  },
  userRecentlyMoments: async (uid) => {
    let result = await userDao.userRecentlyMoments(uid)
    return result
  },
  userFollow: async (from, to) => {
    let result = await userDao.userFollow(from, to)
    console.log(result)
    return result
  },
}