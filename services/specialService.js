const allSpecial = require('../dao/getAllSpecial')
const special = require('../dao/special')

module.exports = {
  special: async (special_id) => {
    let result = special.special(special_id)
    return result
  },
  specialDetail: async (special_id) => {
    let result = special.specialDetail(special_id)
    return result
  },
  specials: async (page, num) => {
    let result = special.specials(page, num)
    return result
  },
  specialSchools: async (special_id,page, num) => {
    let result = special.specialSchools(special_id,page, num)
    return result
  },
  allSpecial: async () => {
    let result = await allSpecial.allSpecial()
    return result
  }
}
