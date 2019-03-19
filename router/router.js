const willController = require('../controllers/willController')
const userController = require('../controllers/userController')
const Router = require('koa-router')
const router = new Router()

router.get('/slideShows', willController.slideShows)
  .get('/hotArticles', willController.hotArticles)
  .get('/recommendArticles', willController.recommendArticles)
  .get('/recommendPeople', willController.recommendPeople)
  .get('/will', willController.will)

router.post('/signUp', userController.signUp)
module.exports  = router