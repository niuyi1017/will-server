const axios = require('axios')
const mongoose = require('mongoose')

function getSchool(page) {
  let uri = {
    page,
    size: 20,
    sort: "view_total",
    uri: "hxsjkqt/api/gk/special/lists"
  }
  console.log(`正在爬取第${page}页...`)
  return new Promise((resolve, reject) => {
    axios.get('ttps://gkcx.eol.cn/api',
      {
        headers: {
          'Content-Type': "application/json; charset=utf-8",
          "Referer": "https://gkcx.eol.cn/special"
        },
        params: uri
      }).then((res) => {
        console.log(`爬取第${page}页已完成...`)
        return resolve(res.data)
      }).catch((err) => {
        console.log(`爬取第${page}页出错了... ${err}`)
        return reject(err)
      })
  })
}
function filterSchoolData(special) {
  return {
    special_id: special.special_id,
    special_name: special.name,
    level1: special.level1,
    level1_name: special.level1_name,
    level3: special.level3,
    level3_name: special.level3_name,
    limit_year: special.limit_year,
    degree: special.degree,
    rankall: special.rankall,
    rank_type: special.rank_type,
    rank: special.rank
  }
}
function getAllPageDataAsync() {
  let getAllPageData = []
  for (let i = 0; i < 20; i++) {
    getAllPageData.push(getSchool(i))
  }
  return getAllPageData
}
async function writeDatebase(specialData) {
  const Special = mongoose.model('Special')
  try {
    let special = await Special.findOne({ Special: specialData.special_id })
    if (!special) {
      special = new Special(specialData)
      await special.save()
    }
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  allSpecial: async () => {
    let getAllPageData = getAllPageDataAsync()
    return Promise.all(getAllPageData)
      .then((pages) => {
        let pageData = []
        pages.forEach((page) => {
          let specials = page.data.item
          specials.forEach(special => {
            let specialData = filterSchoolData(special)
            //Todo 写入数据库  
            writeDatebase(specialData)
            pageData.push(specialData)
          });
        })
        return Promise.resolve(pageData)
      }).catch(err => {
        return Promise.reject(err)
      })
  }
}