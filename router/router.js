const willController = require('../controllers/willController')
const userController = require('../controllers/userController')
const schoolController = require('../controllers/schoolController')
const specialController = require('../controllers/specialController')
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
router.get('/schools', schoolController.schools) 
      .get('/school/:school_id', schoolController.school)
      .get('/school/detail/:school_id',schoolController.schoolDetail)
      .get('/allSchool', schoolController.allSchool)  //admin 爬取所有学校信息并写入数据库

//special 
router.get('/specials',specialController.specials)
      .get('/special/:special_id',specialController.special)
      .get('/special/detail/:special_id', specialController.specialDetail)
      .get('/allSpecial', schoolController.allSpecial) //admin 爬取所有专业信息并写入数据库


module.exports  = router