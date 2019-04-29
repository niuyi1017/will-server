const moment = require('../dao/moment')

module.exports = {
  newMoment: async (_moment) => {
    let result = await moment.newMoment(_moment)
    return result
  },
  moments: async (page, num) => {
    let result = await moment.moments(page, num)
    return result
  },
  moment: async (moment_id) => {
    let result = await moment.moment(moment_id)
    return result
  },
  favour: async (moment_id, uid) => {
    let result = await moment.favour(moment_id, uid)
    return result
  },
  cancelFavour: async (moment_id, uid) => {
    let result = await moment.cancelFavour(moment_id, uid)
    return result
  },
  like: async (moment_id, uid) => {
    let result = await moment.like(moment_id, uid)
    return result
  },
  cancelLike: async (moment_id, uid) => {
    let result = await moment.cancelLike(moment_id, uid)
    return result
  },
}
