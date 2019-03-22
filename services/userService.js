const axios = require('axios')
const allSchool = require('../dao/getAllSchool')
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
    let uri = {
      page:1,
      request_type: 1,
      size:20,
      sort:"view_total",
      uri:"gksjk/api/school/hotlists"
    }
    return axios.get('https://gkcx.eol.cn/api',{
      params:uri
    })
      .then(res => {
        return Promise.resolve(res.data)
      })
  },
  allSchool: async () => {
    
    let result = await allSchool.allSchool()
    // console.log('service' + result)
    return result
  },
}