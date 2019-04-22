const mongoose = require('mongoose')
const topinyin = require("node-pinyin");
module.exports = {
  signUp: async (user) => {
    const User = mongoose.model('User')
    let result = {}
    try {
      let _user = await User.findOne({ phoneNumber: user.phoneNumber })
      if (_user) {
        result.code = -1
        result.msg = "账号已注册"
      }else {
        user.pinyin = topinyin(user.username, { style: "normal" }).join('')
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
  signIn: async (phoneNumber, password) => {
    const User = mongoose.model('User')
    let result = {}
    result.match = false
    try {
      let _user = await User.findOne({ phoneNumber: phoneNumber})
      console.log(_user)
      if (_user) {
        result.uid = _user._id
        result.match = await _user.comparePassword(password, _user.password)
      }
    } catch (error) {
      return new Error(error)
    }
    return result
  }
}
