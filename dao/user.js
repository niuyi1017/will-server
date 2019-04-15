const mongoose = require('mongoose')
module.exports = {
  signUp: async (user) => {
    const User = mongoose.model('User')
    let result = {}
    try {
      let _user = await User.findOne({ username: user.username })
      if (_user) {
        result.code = -1
        result.msg = "账号已注册"
      }else {
        let nuser = new User(user)
        let res = await nuser.save()
        result.code = 0
        result.msg = "注册成功"
      }
    } catch (error) {
      result.code = -2
      result.msg = error
    }

    return result
  }
}
