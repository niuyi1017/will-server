const comment = require('../dao/comment')

module.exports = {
  newComment: async (_comment, recentlyMoment) => {
    let result = await comment.newMoment(_comment, recentlyMoment)
    return result
  },
}