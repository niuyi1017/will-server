const User = require('../models/user')
module.exports = {
  signUp: async (user) => {
    console.log(user.username)
    let user1 = new User(user)
    console.log(user1)
    return user1
    // try {
    //   let _user = await User.findOne({ username: user.username })
    //   if(_user){
    //     console.log("yizhuce")
    //   }else{
    //     console.log(user)
    //     let nuser = new User(user)
    //     console.log(nuser)
    //     return nuser.save()
    //   }
    // } catch (error) {
    //   console.log(error);
    // }

  },
 signIn: async (username, passworld) => {
    return {
      username,
      passworld
    }
  }
}