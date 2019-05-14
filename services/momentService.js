const moment = require('../dao/moment')

module.exports = {
  newMoment: async (_moment, recentlyMoment) => {
    let result = await moment.newMoment(_moment, recentlyMoment)
    return result
  },
  moments: async (uid,page, num) => {
    let result = await moment.moments(uid,page, num)
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
  like: async (moment_id, from, to, recentlyMoment, notification) => {
    let result = await moment.like(moment_id, from, to, recentlyMoment, notification)
    return result
  },
  cancelLike: async (moment_id, from, to, recentlyMoment) => {
    let result = await moment.cancelLike(moment_id, from, to, recentlyMoment)
    return result
  },
}
