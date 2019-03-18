const willController = require('../controllers/willController')
const Router = require('koa-router')
const router = new Router()

router.get('/', willController.index)

module.exports  = router