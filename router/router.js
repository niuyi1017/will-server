const willController = require('../controllers/willController')
const userController = require('../controllers/userController')
const schoolController = require('../controllers/schoolController')
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
router.get('/school/:school_id', schoolController.school)
      .get('/school/detail/:school_id',schoolController.schoolDetail)
      .get('/schools', schoolController.schools)
router.get('/allSchool', schoolController.allSchool)  //爬取所有学校信息并写入数据库
//special 

router.get('/allSpecial', schoolController.allSpecial)
module.exports  = router