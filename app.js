const Koa = require('koa')
const bodyParser = require('koa-bodyParser')
const serve = require('koa-static')
const jwt = require('koa-jwt')
const { connect, initSchema } = require('./database/init')
const logger = require('koa-logger')
const handle401  = require('./middlewares/handle401')

const router = require('./router/router')

;(async () => {
  await connect()
  initSchema()
   
})()

let port = process.env.port || 3000
const app = new Koa()

app.use(handle401)
   .use(jwt)
   .use(logger())
   .use(bodyParser())
   .use(router.routes())
   .use(router.allowedMethods())
   .use(serve(__dirname + '/views'))
   

app.listen(port, () => {
  console.log('will-server is running at http://localhost:3000')
})