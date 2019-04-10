const mongoose = require('mongoose')
const axios = require('axios')

function getSchoolBaseInfo(school_id) {
  let url = `https://gkcx.eol.cn/www/school/${school_id}/info.json`
  let header = {
    "Content-Type": "application/json;charset=utf-8",
    "Referer": `https://gkcx.eol.cn/school/${school_id}`
  }
  return new Promise((resolve,reject) => {
    axios.get(url, { header })
      .then((res) => {
        return resolve(res.data)
      }).catch((err) => {
        return reject(res.data)
      });
  })
}
function getSchoolNewsList(school_id) {
  let url = `https://gkcx.eol.cn/www/school/${school_id}/news/list.json`
  let header = {
    "Content-Type": "application/json;charset=utf-8",
    "Referer": `https://gkcx.eol.cn/school/${school_id}`
  }
  return new Promise((resolve, reject) => {
    axios.get(url, { header })
      .then((res) => {
        return resolve(res.data)
      }).catch((err) => {
        return reject(res.data)
      });
  })
}
function getProvinceSchool(province_id, school_id) {
  let url = `https://gkcx.eol.cn/www/school/province/${province_id}/province_school.json`
  let header = {
    "Content-Type": "application/json;charset=utf-8",
    "Referer": `https://gkcx.eol.cn/school/${school_id}`
  }
  return new Promise((resolve, reject) => {
    axios.get(url, { header })
      .then((res) => {
        return resolve(res.data)
      }).catch((err) => {
        return reject(res.data)
      });
  })
}

module.exports = {
  school: async (school_id) => {
    const School = mongoose.model('School')
    let result = await School.find({ school_id: school_id})
    return result
  },
  schoolDetail: async (school_id) => {
    let result = {}
    result.baseInfo = await getSchoolBaseInfo(school_id)
    result.newsList = await getSchoolNewsList(school_id)
    result.provinceSchool = await getProvinceSchool(result.baseInfo.province_id,school_id)
    return result
  },
  schools: async (page, num) => {
    const School = mongoose.model('School')
    let result = await School.find({})
                              .skip(page*num)
                              .limit(num)
                              .sort({rank:1})
    return result
  }
}