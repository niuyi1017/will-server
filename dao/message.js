const mongoose = require('mongoose')
module.exports = {
  notifications: async(uid, page, num)=> {
    const User = mongoose.model('User')
    let ret = await User.findOne({ _id: uid })
      .populate({
        path: 'notifications.from',
        select: ['username','avatar']
      })
      .exec()
    let result = ret.notifications
    return result
  }
}
