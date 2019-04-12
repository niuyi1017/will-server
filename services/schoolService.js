const allSchool = require('../dao/getAllSchool')
const school = require('../dao/school')

module.exports = {
  schools: async (page, num) => {
    let result = await school.schools(page, num)
    return result
  },
  school: async (school_id) => {
    let result = await school.school(school_id)
    return result
  },
  schoolDetail: async (school_id) => {
    let result = await school.schoolDetail(school_id)
    return result
  },
  schoolSpecials: async (school_id) => {
    let result = await school.specials(school_id)
    return result
  },
  getSchoolByRank: async (rank, province_id, subject_id) => {
    console.log(rank, province_id, subject_id)
    let result = await school.getSchoolByRank(rank, province_id, subject_id)
    return result
  },
  getSchoolByScore: async (score, province_id, subject_id ) => {
    let result = await school.getSchoolByScore(score, province_id, subject_id )
    return result
  },
  allSchool: async () => {
    let result = await allSchool.allSchool()
    return result
  }
}
