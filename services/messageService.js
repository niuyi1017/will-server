const message = require('../dao/message')
module.exports = {
  notifications: async(uid, page, num) => {
    let result = await message.notifications(uid, page, num)
    return result
  },
}