const axios = require('axios')
const mongoose = require('mongoose')

function getSchool(page){
    let uri = {
      page,
      request_type: 1,
      size: 20,
      sort: "view_total",
      uri: "gksjk/api/school/hotlists"
    }
    console.log(`正在爬取第${page}页...`)
    return new Promise((resolve, reject) => {
      axios.get('https://gkcx.eol.cn/api',
        {
          params: uri
        }).then((res)=>{
          console.log(`爬取第${page}页已完成...`)
          return resolve(res.data)
        }).catch((err) => {
          console.log(`爬取第${page}页出错了... ${err}`)
          return reject(err)
        })
    })
}
function filterSchoolData(school){
  // console.log(school)
  return {
    school_id:school.school_id,
    rank: school.rank,
    // name:school.name,
    // is211: school.f211 == 1 ? true: false,
    // is985: school.f985 == 1 ? true : false,
    // isDual_class: school.dual_class_name,
    // type: school.type_name,
    // logo: `https://static-data.eol.cn/upload/logo/${school.school_id}.jpg`
  }
}
function getAllPageDataAsync(){
  let getAllPageData = []
  for (let i = 0; i < 2; i++) {
    getAllPageData.push(getSchool(i))
  }
  return getAllPageData
}
async function writeDatebase(schoolData) {
  const School = mongoose.model('School')
  try {
    let school = await School.findOne({ school_id: schoolData.school_id })
    // if (!school) {
    //   school = new School(schoolData)
    //   await school.save()
    // }
    if(school){
      school.rank = schoolData.rank
      await school.save()
    }
  } catch (error) {
    console.log(error)
  }
  
}

module.exports = {
  allSchool: async () => {
    let getAllPageData = getAllPageDataAsync()
    return Promise.all(getAllPageData)
      .then((pages) => {
        let pageData = []
        pages.forEach((page) => {
          let schools = page.data.item
          schools.forEach(school => {
            let schoolData = filterSchoolData(school)
            //Todo 写入数据库  
            writeDatebase(schoolData)
            pageData.push(schoolData)
          });
        })
        return Promise.resolve(pageData)
      }).catch(err => {
        return Promise.reject(err)
      })
  }
}