const mongoose = require('mongoose')
const glob = require('glob')
const { resolve } = require('path')
const db = 'mongodb://127.0.0.1/test'
mongoose.Promise = global.Promise  

exports.initSchema = () => {
  glob.sync(resolve(__dirname, './schema', '**/*.js')).forEach(require)
}
exports.connect = () => {
  let maxConnectTimes = 0
  return new Promise((resolve, reject) => {
    if (process.env.NODE_ENV !== 'production') {
      mongoose.set('debug', true)
    }
    mongoose.set('useCreateIndex', true);
    mongoose.connect(db, { useNewUrlParser: true })

    mongoose.connection.on('disconnected', () => {
      maxConnectTimes ++ 
      if (maxConnectTimes < 5){
        mongoose.connection(db, { useNewUrlParser: true })
      }else{
        reject()
        throw new Error("数据库挂了，快去修吧少年！")
      }
    })
    mongoose.connection.on('error', (err) => {
      if (maxConnectTimes < 5) {
        mongoose.connect(db, { useNewUrlParser: true })
      } else {
        throw new Error("数据库挂了，快去修吧少年！")
      }
    })
    mongoose.connection.once('open', (err) => {
      resolve()
      console.log('Mongodb connected successfully!')
    })
  })
}