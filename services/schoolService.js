const axios = require('axios')
const mongoose = require('mongoose')
const allSchool = require('../dao/getAllSchool')

module.exports = {
  school: async () => {
    let uri = {
      page: 1,
      request_type: 1,
      size: 20,
      sort: "view_total",
      uri: "gksjk/api/school/hotlists"
    }
    return axios.get('https://gkcx.eol.cn/api', {
      params: uri
    })
      .then(res => {
        return Promise.resolve(res.data)
      })
  },
  schoollist: async() => {
    const School = mongoose.model('School')
    let result = await School.find({}).limit(100)
    return result
  },
  allSchool: async () => {
    let result = await allSchool.allSchool()
    return result
  }
}
