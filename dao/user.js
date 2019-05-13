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
    try {
      let _user = await User.findOne({ phoneNumber: phoneNumber})
      if (_user) {
        let match = await _user.comparePassword(password, _user.password)
        result.match = match
        if(match){
          result.uid = _user._id
          result.following = _user.following
          result.recentlyMoments = _user.recentlyMoments
          result.like = _user.like,
          result.favour = _user.favour
        }
      }
    } catch (error) {
      return new Error(error)
    }
    return result
  },
  users: async (page, num) => {
    const User = mongoose.model('User')
    let result = await User.find({})
      .skip(page * num)
      .limit(num)
    return result
  },
  user: async (uid) => {
    const User = mongoose.model('User')
    let result = await User.findOne({_id:uid})
    return result
  },    
  userRecentlyMoments: async (uid) => {
    const User = mongoose.model('User')
    let result = await User.findOne({ _id: uid })
      .populate({
        path:'post.moment',
        select: ['content','picUrls','meta']
      })
    .exec()
    return result
  },
  userFollow: async (from, to, recentlyMoment) => {
    const User = mongoose.model('User')
    let result = {}
    try {
      let updateFollowing = {
        $push: { 
          "following": to ,
          "recentlyMoments": recentlyMoment 
        }
      }
      let updateFollower = {
        $push: { "follower": from }
      }
      let newFrom = await User.findByIdAndUpdate(from, updateFollowing)
      let newTo = await User.findByIdAndUpdate(to, updateFollower)
      result = {
        following: newTo._id, //当前用户新关注的人
        follower: newFrom._id //当前用户
      }
    } catch (error) {
      return new Error(error)
    }
    return result
  }
}
