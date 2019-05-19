const mongoose = require('mongoose')
const axios = require('axios')

function getSchoolBaseInfo(school_id) {
  let url = `https://gkcx.eol.cn/www/school/${school_id}/info.json`
  let headers = {
    "Content-Type": "application/json;charset=utf-8",
    "Referer": `https://gkcx.eol.cn/school/${school_id}`
  }
  return new Promise((resolve,reject) => {
    axios.get(url, { headers })
      .then((res) => {
        return resolve(res.data)
      }).catch((err) => {
        return reject(err)
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
        return reject(err)
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
        return reject(err)
      });
  })
}
function getSchoolSpecials(school_id,detail) {
  let url = `https://gkcx.eol.cn/www/school/${school_id}/pc_special.json`
  let headers = {
    "Content-Type": "application/json;charset=utf-8",
    "Referer": `https://gkcx.eol.cn/school/${school_id}`,
    "Host": "gkcx.eol.cn"
  }
  if(detail){
    return new Promise((resolve, reject) => {
      axios.get(url, { headers })
        .then((res) => {
          return resolve(res.data.special_detail)
        }).catch((err) => {
          return reject(err)
        });
    })
  }else{
    return new Promise((resolve, reject) => {
      axios.get(url, { headers })
        .then((res) => {
          let result = {}
          result.specials = res.data[1]
          result.classSpecial = res.data.special_detail[4]
          return resolve(result)
        }).catch((err) => {
          return reject(err)
        });
    })
  }
  
}
// @Todo page
function getSchoolsByRank(rank, province_id, subject_id) {
  if (!province_id){
    province_id = 37
  }
  if(!subject_id){
    subject_id = 1
  }
  let url = `https://g.eol.cn/zsgk/api`
  let headers = {
    "Content-Type": "application/json;charset=utf-8",
    "Referer": `https://g.eol.cn/choose/school/rank`,
    "Host": "g.eol.cn",
    "Origin": "https://g.eol.cn",
  }
  let data = {
    "local_province_id":province_id,
    "local_type_id": subject_id,
    "page":0,
    "request_type":2,
    "size":20,
    "total": rank,
    "uri": "gksjk/api/school/totallists"
  }
  return new Promise((resolve, reject) => {
    axios.post(url, { headers, data })
      .then((res) => {
        return resolve(res.data.data.item)
      }).catch((err) => {
        return reject(err)
      });
  })
}
// @Todo page
function getSchoolsByScore(score, province_id, subject_id ) {
  if (!province_id) {
    province_id = 37
  }
  if (!subject_id) {
    subject_id = 1
  }
  let url = `https://g.eol.cn/zsgk/api`
  let headers = {
    "Content-Type": "application/json;charset=utf-8",
    "Referer": `https://g.eol.cn/choose/school/rank`,
    "Host": "g.eol.cn",
    "Origin": "https://g.eol.cn",
  }
  let data = {
    "local_province_id": province_id,
    "local_type_id": subject_id,
    "page": 1,
    "request_type": 2,
    "size": 50,
    score,
    "uri": "gksjk/api/school/gufenlists"
  }
  return new Promise((resolve, reject) => {
    axios.post(url, { headers, data })
      .then((res) => {
        return resolve(res.data.data.item)
      }).catch((err) => {
        return reject(err)
      });
  })
}

module.exports = {
  school: async (school_id) => {
    const School = mongoose.model('School')
    let result = await School.findOne({ school_id: school_id})
    return result
  },
  schoolDetail: async (school_id) => {
    let result = {}
    result.baseInfo = await getSchoolBaseInfo(school_id)
    result.newsList = await getSchoolNewsList(school_id)
    result.specials = await getSchoolSpecials(school_id)
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
  },
  specials: async (school_id) => {
    let result = await getSchoolSpecials(school_id,true)
    return result
  },
  getSchoolsByRank: async (rank, province_id, subject_id) => {
    let result = await getSchoolsByRank(rank, province_id, subject_id)
    return result
  },
  getSchoolsByScore: async (score, province_id, subject_id ) => {
    let result = await getSchoolsByScore(score, province_id, subject_id )
    return result
  },
}