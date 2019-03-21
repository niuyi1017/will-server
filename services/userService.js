const axios = require('axios')
module.exports = {
  signUp: async (username, passworld, confirmPassword) => {
   return {
     username,
     passworld,
     confirmPassword
   }
 },
 signIn: async (username, passworld) => {
    return {
      username,
      passworld
    }
  },
  school: async () => {
    return axios.get('https://gkcx.eol.cn/www/school/554/info.json')
      .then(res => {
        return Promise.resolve(res.data)
      })
  }
}