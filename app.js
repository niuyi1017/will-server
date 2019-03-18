const Koa = require('koa')
const app = new Koa()
const bodyParser = require('koa-bodyParser')
const router = require('./router/router')

app.use(bodyParser())
   .use(router.routes())
   .use(router.allowedMethods())

app.listen(3000, () => {
  console.log('will-server is running at http://localhost:3000')
})