const Koa = require('koa')
const bodyParser = require('koa-bodyParser')
const serve = require('koa-static')
const mongoose = require('mongoose')
const { connect, initSchema } = require('./database/init')
// const logger = require('morgan')

const router = require('./router/router')

;(async () => {
  await connect()
  initSchema()
   
  const School = mongoose.model('School')
  const schools = await School.find({})
  console.log(schools)
})()

let port = process.env.port || 3000
let env = process.env.NODE_ENV || 'development'
let dbUrl = 'mongodb://127.0.0.1/test'

const app = new Koa()
app.use(bodyParser())
   .use(router.routes())
   .use(router.allowedMethods())
   .use(serve(__dirname + '/views'))

app.listen(port, () => {
  console.log('will-server is running at http://localhost:3000')
})