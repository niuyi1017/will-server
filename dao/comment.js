const mongoose = require('mongoose')

module.exports = {
  newComment: async (_comment, recentlyMoment, notification) => {
    const Comment = mongoose.model('Comment')
    const User = mongoose.model('User')
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
        comments = await Moment.findById(_comment.moment_id)
          .populate({
            path: 'comments',
            select: ['author', 'content', 'replys', 'like_num', 'meta'],
            populate: {
              path: 'author',
              select: ['username', 'avatar']
            }
          }).exec()
      } else if (_comment.replyType == 1){
        const Article = mongoose.model('Article')
        moment = await Article.findByIdAndUpdate(_comment.moment_id, updateMoment)//update moment
      }

      let user = await User.findByIdAndUpdate(uid, updateUser)//update recentlyMoment
      let updateTo = await User.findByIdAndUpdate(moment.author, updateNotification) //update notification
      
      result = {
        comment_id,
        comments:comments.comments,
        uid: user._id,
        updateTo: updateTo._id
      }
      console.log(result)
    } catch (error) {
      return new Error(error)
    }
    return result
  },
  newReply: async (_reply, recentlyMoment, notification) => {
    const Comment = mongoose.model('Comment')
    const User = mongoose.model('User')
    let {from, to, content, comment_id}  = _reply
    console.log(from)
    try {
      let updateReplys = {
        $push: {
          "replys": {from,to,content}
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
      let comment = await Comment.findByIdAndUpdate(comment_id, updateReplys)
      let updateFrom = await User.findByIdAndUpdate(from.uid, updateUser)//update recentlyMoment
      let updateTo = await User.findByIdAndUpdate(to, updateNotification) //update notification
      let _replys = await Comment.findById(comment_id)
      result = {
        comment_id: comment._id,
        from: updateFrom._id,
        to: updateTo._id,
        replys: _replys.replys
      }
    } catch (error) {
      return new Error(error)
    }
    return result
  },
}