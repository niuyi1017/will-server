const Koa = require('koa')
const bodyParser = require('koa-bodyParser')
const serve = require('koa-static')
const mongoose = require('mongoose')
// const logger = require('morgan')

const router = require('./router/router')

let port = process.env.port || 3000
let env = process.env.NODE_ENV || 'development'
let dbUrl = 'mongodb://127.0.0.1/test'

if (env === 'development') {
  dbUrl = 'mongodb://localhost/test'
}
mongoose.connect(dbUrl, { useNewUrlParser: true })

const app = new Koa()
app.use(bodyParser())
   .use(router.routes())
   .use(router.allowedMethods())
   .use(serve(__dirname + '/views'))

if ('development' === env) {
  // app.use(logger(':method :url :status'));
  mongoose.set('debug', true);
}

app.listen(port, () => {
  console.log('will-server is running at http://localhost:3000')
})