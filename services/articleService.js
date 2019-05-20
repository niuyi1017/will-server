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
}