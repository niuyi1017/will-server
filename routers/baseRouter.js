const willController = require('../controllers/willController')
const userController = require('../controllers/userController')
const questionController = require('../controllers/questionController')
const momentController = require('../controllers/momentController')
const schoolController = require('../controllers/schoolController')
const specialController = require('../controllers/specialController')
const messageController = require('../controllers/messageController')
const commentController = require('../controllers/commentController')
const articleController = require('../controllers/articleController')

const uploadController = require('../controllers/uploadController')
const parseToken = require('../middlewares/parseToken')
const Router = require('koa-router')
const router = new Router()
const jwt = require('koa-jwt')({ secret: 'will' })

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
      .get('/user/:uid',jwt,userController.user)
      .get('/userRecArticles', userController.userRecentlyMoments)
      .post('/user/follow', userController.userFollow)

//question
router.post('/question',jwt, questionController.newQuestion)//发布问题
      /**
        {
            "title": "烟台大学有那些隐藏美食？2",
            "tag": "美食",
            "author": "5cc30a5241050a12702cbb62",
            "content": "求推荐美食",
            "picUrls":[ "http://pq2z2mcsm.bkt.clouddn.com/test/fe/1.jpg",
                      "http://pq2z2mcsm.bkt.clouddn.com/test/fe/2.jpg"]
            }
       */
      .get('/questions', questionController.questions) //问题列表
      .get('/questions/:question_id',jwt, questionController.question) //问题详情
      .put('/question/favour',jwt, questionController.favour)//收藏问题 （uid，question_id）
      .put('/queation/cancelFavour', jwt,questionController.cancelFavour)//取消收藏（uid，question_id）

//moment
router.post('/moment',jwt,momentController.newMoment)//发布同学圈
      .get('/moments', momentController.moments) //同学圈列表
      .get('/moments/:moment_id', momentController.moment) //同学圈详情
      .put('/moment/favour', jwt, momentController.favour)//收藏同学圈 （uid，moment_id）
      .put('/moment/cancelFavour', jwt, momentController.cancelFavour)//取消收藏（uid，moment_id）
      .put('/moment/like', jwt, momentController.like)//点赞同学圈 （uid，moment_id）
      .put('/moment/cancelLike', jwt, momentController.cancelLike)//取消点赞（uid，moment_id）

router.post('/article', articleController.newArticle)//发布同学圈
      .get('/articles', articleController.articles) //文章列表
      .get('/articles/:article_id', articleController.article) //文章详情
      // .put('/article/favour', jwt, articleController.favour)//收藏文章 （uid，article_id）
      // .put('/article/cancelFavour', jwt, articleController.cancelFavour)//取消收藏（uid，article_id）
      .put('/article/like', jwt, articleController.like)//点赞文章 （uid，article_id）
      .put('/article/cancelLike', jwt, articleController.cancelLike)//取消点赞（uid，article_id）

router.get('/messages/notifications',messageController.notifications)

router.post('/comment', commentController.newComment)
router.post('/comment/reply', commentController.newReply)
//school 
router.get('/schools',schoolController.schools)  //学校列表
      .get('/schools/:school_id', schoolController.school)// id 简介
      .get('/schools/:school_id/detail',schoolController.schoolDetail) //详情
      .get('/schools/:school_id/specials', schoolController.schoolSpecials) //开设专业
      .get('/schoolsByRank',jwt, schoolController.getSchoolsByRank) //根据位次选大学  todo test
      .get('/schoolsByScore',jwt,schoolController.getSchoolsByScore) //根据位次选大学
      .get('/allSchools',jwt, schoolController.allSchool)  //admin 爬取所有学校信息并写入数据库

//special 
router.get('/specials',specialController.specials) //专业列表
      .get('/specials/:special_id',specialController.special) //简介
      .get('/specials/:special_id/detail', jwt,specialController.specialDetail) //详情
      .get('/specials/:special_id/schools', jwt,specialController.specialSchools) //开设大学（page，num）
      .get('/allSpecias', jwt,specialController.allSpecial) //admin 爬取所有专业信息并写入数据库

//uploadToQiniu
router.get('/uploadsk',jwt,uploadController.createSk)
module.exports  = router