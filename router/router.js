const willController = require('../controllers/willController')
const userController = require('../controllers/userController')
const Router = require('koa-router')
const router = new Router()

//will page
router.get('/slideShows', willController.slideShows)
  .get('/hotArticles', willController.hotArticles)
  .get('/recommendArticles', willController.recommendArticles)
  .get('/recommendPeople', willController.recommendPeople)
  .get('/will', willController.will)
  
//user page
router.post('/signUp', userController.signUp)
  .post('/signIn', userController.signIn)
//school info

router.get('/school',userController.school)
module.exports  = router