const mongoose = require('mongoose')

module.exports = {
  newComment: async (_comment, recentlyMoment, notification) => {
    const Comment = mongoose.model('Comment')
    const Moment = mongoose.model('Moment')
    const User = mongoose.model('User')

    // _comment = {
    //   author:'1231321',
    //   content: "neirong",
    //   replyType: 0, 同学圈
    //  
    //   momentId:'123131'
    // }

    let uid = _comment.author
    
    let result = {}
    try {
      let comment = new Comment(_comment)
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
      let updateNotification = {
        $push: {
          "notifications": notification
        },
      }
      //Todo switch replyType 
      let moment = null
      if (_comment.replyType == 0){
        const Moment = mongoose.model('Moment')
        moment = await Moment.findByIdAndUpdate(_comment.moment_id, updateMoment)//update moment
      } else if (_comment.replyType == 1){
        const Article = mongoose.model('Article')
        moment = await Article.findByIdAndUpdate(_comment.moment_id, updateMoment)//update moment
      }
      let user = await User.findByIdAndUpdate(uid, updateUser)//update recentlyMoment
      let updateTo = await User.findByIdAndUpdate(moment.author, updateNotification) //update notification
      result = {
        comment_id,
        moment:moment._id,
        uid: user._id,
        updateTo: updateTo._id
      }
    } catch (error) {
      return new Error(error)
    }
    return result
  },
}