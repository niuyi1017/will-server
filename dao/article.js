const mongoose = require('mongoose')

module.exports = {
  newArticle: async (_article) => {
    const Article = mongoose.model('Article')
    const User = mongoose.model('User')
    let uid = _article.author
    let result = {}
    try {
     
      let article = new Article(_article)
      console.log(456)
      let savedArticle = await article.save()
      let article_id = savedArticle._id
      console.log(123)
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
  like: async (article_id, from, to, recentlyMoment, notification) => {
    const Article = mongoose.model('Article')
    const User = mongoose.model('User')
    let updateArticle = {
      $push: { like: from },
      $inc: { like_num: 1 }
    }
    let updateUser = {
      $push: {
        "like.article": article_id,
        "recentlyMoments": recentlyMoment
      },
      $inc: { like_num: 1 }
    }
    let updateNotification = {
      $push: {
        "notifications": notification
      },
    }
    try {
      let article = await Article.findByIdAndUpdate(article_id, updateArticle)
      let user = await User.findByIdAndUpdate(from, updateUser)
      let updateTo = await User.findByIdAndUpdate(to, updateNotification)
      result = {
        article_id: article._id,
        like_num: article.like_num,
        user: user._id
      }

    } catch (error) {
      return new Error(error)
    }
    return result
  },
  cancelLike: async (article_id, from, to, recentlyMoment) => {
    const Article = mongoose.model('Article')
    const User = mongoose.model('User')
    let updateArticle = {
      $pull: { like: from },
      $inc: { like_num: -1 }
    }
    let updateUser = {
      $pull: {
        "like.article": article_id,
        'recentlyMoments': recentlyMoment
      },
      $inc: { like_num: -1 }
    }
    try {
      let article = await Article.findByIdAndUpdate(article_id, updateArticle)
      let user = await User.findByIdAndUpdate(from, updateUser)
      result = {
        article_id: article._id,
        like_num: article.like_num,
        user: user._id
      }
    } catch (error) {
      return new Error(error)
    }
    return result
  },
}