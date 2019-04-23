const willController = require('../controllers/willController')
const userController = require('../controllers/userController')
const questionController = require('../controllers/questionController')
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
      .get('/users', userController.users)

//question
router.post('/question', questionController.newQuestion)//发布问题
      /**
        {
            "title": "烟台大学有那些隐藏美食？2",
            "tag": "美食",
            "author": "5cbecd323371fc128cf0f8c6",
            "content": "求推荐美食",
            "picUrls":[ "http://pq2z2mcsm.bkt.clouddn.com/test/fe/1.jpg",
                      "http://pq2z2mcsm.bkt.clouddn.com/test/fe/2.jpg"]
            }
       */
      .get('/questions', questionController.questions) //问题列表
      .get('/question/:question_id', questionController.question) //问题详情
      .put('/question/favour', questionController.favour)//收藏问题 （uid，question_id）
      .put('/queaton/cancelFavour', questionController.cancelFavour)//取消收藏（uid，question_id）

//moment
router.post('/moment')

//school 
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

//uploadToQiniu
router.get('/uploadsk',uploadController.createSk)
module.exports  = router