const mongoose = require('mongoose')

module.exports = {
  newComment: async (_comment, recentlyMoment) => {
    const Comment = mongoose.model('Comment')
    const Moment = mongoose.model('Moment')
    const User = mongoose.model('User')
    let uid = _comment.author
    let result = {}
    try {
      let comment = new Moment(_comment)
      let savedComment = await comment.save()
      let comment_id = savedComment._id
      let updateMoment = {
        $push: {
          "comments": comment_id
        }
      }
      let updateUser = {
        $push: {
          "recentlyMoments": recentlyMoment 
        }
      }
      let moment = await Moment.findByIdAndUpdate(uid, updateMoment)
      let user = await User.findByIdAndUpdate(uid, updateUser)
      result = {
        comment_id,
        moment:moment._id,
        uid: user._id
      }
    } catch (error) {
      return new Error(error)
    }
    return result
  },
}