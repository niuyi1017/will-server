const article = require('../dao/article')

module.exports = {
  newArticle: async (_article) => {
    let result = await article.newArticle(_article)
    return result
  },
  articles: async (page, num) => {
    let result = await article.articles(page, num)
    return result
  },
  article: async (article_id) => {
    let result = await article.article(article_id)
    return result
  },
  like: async (article_id, from, to, recentlyMoment, notification) => {
    let result = await article.like(article_id, from, to, recentlyMoment, notification)
    return result
  },
  cancelLike: async (article_id, from, to, recentlyMoment) => {
    let result = await article.cancelLike(article_id, from, to, recentlyMoment)
    return result
  },
}