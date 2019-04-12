const mongoose = require('mongoose')
const axios = require('axios')

function getSpecialDetail(special_id) {
  let url = `https://gkcx.eol.cn/www/special/${special_id}/pc_special_detail.json`
  let headers = {
    "Content-Type": "application/json;charset=utf-8",
    "Referer": `Referer:https://gkcx.eol.cn/special/${special_id}`
  }
  return new Promise((resolve, reject) => {
    axios.get(url, { headers })
      .then((res) => {
        return resolve(res.data)
      }).catch((err) => {
        return reject(res.data)
      });
  })
}
function getSpecialSchool(special_id, page, size) {
 
  if(!page){
    page= 0
  }
  if(!size){
    size = 20
  }
  console.log(page, size)
  let url = `https://gkcx.eol.cn/api`
  let header = {
    "Content-Type": "application/json;charset=utf-8",
    "Referer": `https://gkcx.eol.cn/specials/school/${special_id}`,
    "Host": "gkcx.eol.cn",
    "Origin": "https://gkcx.eol.cn"
  }
  let params = {
      page,
      request_type:1,
      size,
      special_id,
      uri:"hxsjkqt/api/gk/schoolSpecial/lists"
  }
  return new Promise((resolve, reject) => {
    axios.get(url, { header, params})
      .then((res) => {
        return resolve(res.data)
      }).catch((err) => {
        return reject(res.data)
      });
  })
}

async function filterSpecialDetail(special_id){
  let result = {}
  let data = await getSpecialDetail(special_id)
  for (key in data) {
    if (key == 'content' || key == "continue_exp" || key == 'job'){
      continue
    }
    result[key] = data[key]
  }
  return result
}
async function filterSpecialSchool(special_id,page,num) {
  let result = {}
  let data = await getSpecialSchool(special_id,page,num)
  result = data.data.item
  return result
}
module.exports = {
  special: async (special_id) => {
    const Special = mongoose.model('Special')
    let result = await Special.find({ special_id: special_id })
    return result
  },
  specialDetail: async (special_id) => {
    let result = {}
    result.specialDetail = await filterSpecialDetail(special_id)
    result.specialSchool = await filterSpecialSchool(special_id)
    return result
  },
  specials: async (page, num) => {
    const Special = mongoose.model('Special')
    let result = await Special.find({})
      .skip(page * num)
      .limit(num)
      .sort({ level3: 1 })  
    return result
  },
  specialSchools: async (special_id, page, num) => {
    let result = await filterSpecialSchool(special_id,page,num)
    return result
  },
}