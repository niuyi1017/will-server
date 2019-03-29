const Koa = require('koa')
const bodyParser = require('koa-bodyParser')
const serve = require('koa-static')

const router = require('./router/router')

const app = new Koa()
app.use(bodyParser())
   .use(router.routes())
   .use(router.allowedMethods())
   .use(serve(__dirname + '/views'))

app.listen(3000, () => {
  console.log('will-server is running at http://localhost:3000')
})