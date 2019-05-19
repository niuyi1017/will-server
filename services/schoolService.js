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
  getSchoolsByRank: async (rank, province_id, subject_id) => {
    let result = await school.getSchoolsByRank(rank, province_id, subject_id)
    return result
  },
  getSchoolsByScore: async (score, province_id, subject_id ) => {
    let result = await school.getSchoolsByScore(score, province_id, subject_id )
    return result
  },
  allSchool: async () => {
    let result = await allSchool.allSchool()
    return result
  }
}
  // "test": "echo \"Error: no test specified\" && exit 1",