const jwt = require('jsonwebtoken')
const secret = 'will'
function parse(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err, decode) => {
      if (err) {
        return reject(err)
      } else {
        return resolve(decode)
      }
    })
  })
}
async function parseToken  (ctx, next)  {
  if (ctx.request.header.authorization){
    let token = ctx.request.header.authorization.split(' ')[1]
    console.log(token)
    parse(token).then((res) => {
      ctx.uid = res.uid
    }).catch(err => {
      console.log(err)
      ctx.uid = null
    })
  }else{
    ctx.uid = null
  }
  await next()
}
module.exports = parseToken;