const willController = require('../controllers/willController')
const userController = require('../controllers/userController')
const schoolController = require('../controllers/schoolController')
const specialController = require('../controllers/specialController')
const uploadController = require('../controllers/uploadController')
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
router.get('/schools', schoolController.schools)  //学校列表
      .get('/schools/:school_id', schoolController.school)// id 简介
      .get('/schools/:school_id/detail',schoolController.schoolDetail) //详情
      .get('/schools/:school_id/specials', schoolController.schoolSpecials) //开设专业
      .get('/schoolByRank', schoolController.getSchoolByRank) //根据位次选大学
      .get('/schoolByScore', schoolController.getSchoolByScore) //根据位次选大学
      .get('/allSchools', schoolController.allSchool)  //admin 爬取所有学校信息并写入数据库

//special 
router.get('/specials',specialController.specials) //专业列表
      .get('/specials/:special_id',specialController.special) //简介
      .get('/specials/:special_id/detail', specialController.specialDetail) //详情
      .get('/specials/:special_id/schools', specialController.specialSchools) //开设大学（page，num）
      .get('/allSpecias', specialController.allSpecial) //admin 爬取所有专业信息并写入数据库

//upload

router.get('/uploadsk',uploadController.createSk)
module.exports  = router