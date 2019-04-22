const secret = 'will'
const qiniu = require('qiniu')
const accessKey = 'Qw7aqtmlX09_O4JkjBDKYS8UZIawZPdGo5tWGOtG'
const secretKey = 'U3Fyln1IKFEjG1g1NQr_hNpuQ_f_vEkvdMY4ggAL'
const bucket = "uploadtest"
module.exports = {
  createSk: async () => {
    let result = {}
    try {
      let  mac = new qiniu.auth.digest.Mac(accessKey, secretKey)
      var options = {
        scope: bucket,
        expires: 12*60*60,
        returnBody: '{"key":"$(key)","hash":"$(etag)","fsize":$(fsize),"bucket":"$(bucket)","name":"$(x:name)"}'
      }
      var putPolicy = new qiniu.rs.PutPolicy(options)
      var uploadToken = putPolicy.uploadToken(mac)
      result.uploadToken = uploadToken
      return result
    } catch (error) {
      return new Error(error)
    }
  }
}