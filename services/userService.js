const userDao = require('../dao/user')
module.exports = {
  signUp: async (user) => {
    console.log(user)
    let result = await userDao.signUp(user)
    if(result.code == 0){
      
    }
    return result
    

  },
 signIn: async (username, passworld) => {
    return {
      username,
      passworld
    }
  }
}