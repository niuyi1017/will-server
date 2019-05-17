const comment = require('../dao/comment')

module.exports = {
  newComment: async (_comment, recentlyMoment, notification) => {
    let result = await comment.newComment(_comment, recentlyMoment, notification)
    return result
  },
  newReply: async (reply, recentlyMoment, notification) => {
    let result = await comment.newReply(reply, recentlyMoment, notification)
    console.log(result,'service')
    return result
  },
}