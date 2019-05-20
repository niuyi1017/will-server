const mongoose = require('mongoose')

module.exports = {
  newArticle: async (_article) => {
    const Article = mongoose.model('Article')
    const User = mongoose.model('User')
    let uid = _article.author
    let result = {}
    try {
      let article = new Article(_article)
      let savedArticle = await article.save()
      let article_id = savedArticle._id
      let update = {
        $push: {
          "post.article": article_id
        },
        $inc: { post_num: 1 }
      }
      let user = await User.findByIdAndUpdate(uid, update)
      result = {
        article_id,
        uid: user._id
      }
    } catch (error) {
      return new Error(error)
    }
    return result
  },
  articles: async (page, num) => {
    const Article = mongoose.model('Article')
    let result = await Article.find({})
      .skip(page * num)
      .limit(num)
      .sort({ 'meta.createdAt': -1 })
      .populate({ path: 'author', select: ['avatar', 'username'] })
      .exec()
    return result
  },
  article: async (article_id) => {
    console.log(article_id)
    const Article = mongoose.model('Article')
    let result = await Article.findByIdAndUpdate(article_id, { $inc: { read_num: 1 } })
      .populate({
        path: 'author', select: ['username', 'avatar'],
      })
      .populate({
        path: 'comments',
        select: ['author', 'content', 'replys', 'like_num', 'meta'],
        populate: {
          path: 'author',
          select: ['username', 'avatar']
        }
      }
      )
      .exec()

    return result
  },
}