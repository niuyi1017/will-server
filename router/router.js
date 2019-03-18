const willController = require('../controllers/willController')
const Router = require('koa-router')
const router = new Router()

router.get('/slideShows', willController.slideShows)
router.get('/hotArticles', willController.hotArticles)
router.get('/recommendArticles', willController.recommendArticles)
router.get('/recommendPeople', willController.recommendPeople)
module.exports  = router