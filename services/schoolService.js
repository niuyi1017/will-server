// const axios = require('axios')
const allSchool = require('../dao/getAllSchool')
const allSpecial = require('../dao/getAllSpecial')
const school = require('../dao/school')

module.exports = {
  school: async (school_id) => {
    let result = school.school(school_id)
    return result
  },
  schoolDetail: async (school_id) => {
    let result = school.schoolDetail(school_id)
    return result
  },
  schools: async(page, num) => {
    let result = school.schools(page,num)
    return result
  },
  allSchool: async () => {
    let result = await allSchool.allSchool()
    return result
  },
  allSpecial: async () => {
    let result = await allSpecial.allSpecial()
    return result
  }
}
