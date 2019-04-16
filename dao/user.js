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
        await nuser.save()
        result.code = 0
        result.msg = "注册成功"
      }
    } catch (error) {
      return new Error(error)
    }
    return result
  },
  signIn: async (username, password) => {
    const User = mongoose.model('User')
    let match = false
    try {
      let _user = await User.findOne({ username: username})
      if (_user) {
        match = await _user.comparePassword(password, _user.password)
      }
    } catch (error) {
      return new Error(error)
    }
    return match
  }
}
