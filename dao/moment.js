const mongoose = require('mongoose')

module.exports = {
  newMoment: async (_moment) => {
    const Moment = mongoose.model('Moment')
    const User = mongoose.model('User')
    let uid = _moment.author
    let result = {}
    try {
      let moment = new Moment(_moment)
      let savedMoment = await moment.save()
      let moment_id = savedMoment._id
      let update = {
        $push: { "post.moment": moment_id },
        $inc: { post_num: 1 }
      }
      let user = await User.findByIdAndUpdate(uid, update)
      result = {
        moment_id,
        uid: user._id
      }
    } catch (error) {
      return new Error(error)
    }
    return result
  },
  moments: async (page, num) => {
    const Moment = mongoose.model('Moment')
    let result = await Moment.find({})
      .skip(page * num)
      .limit(num)
    return result
  },
  moment: async (moment_id) => {
    const Moment = mongoose.model('Moment')
    let result = await Moment.findByIdAndUpdate(moment_id, { $inc: { read_num: 1 } })
    return result
  },
  favour: async (moment_id, uid) => {
    const Moment = mongoose.model('Moment')
    const User = mongoose.model('User')
    let updateMoment = {
      $push: { favour: uid },
      $inc: { favour_num: 1 }
    }
    let updateUser = {
      $push: { "favour.moment": moment_id },
      $inc: { favour_num: 1 }
    }
    try {
      let moment = await Moment.findByIdAndUpdate(moment_id, updateMoment)
      let user = await User.findByIdAndUpdate(uid, updateUser)
      result = {
        moment_id: moment._id,
        favour_num: moment.favour_num,
        user: user._id
      }
    } catch (error) {
      return new Error(error)
    }
    return result
  },
  cancelFavour: async (moment_id, uid) => {
    const Moment = mongoose.model('Moment')
    const User = mongoose.model('User')
    let updateMoment = {
      $pull: { favour: uid },
      $inc: { favour_num: -1 }
    }
    let updateUser = {
      $pull: { "favour.moment": moment_id },
      $inc: { favour_num: -1 }
    }
    try {
      let moment = await Moment.findByIdAndUpdate(moment_id, updateMoment)
      let user = await User.findByIdAndUpdate(uid, updateUser)
      result = {
        moment_id: moment._id,
        favour_num: moment.favour_num,
        user: user._id
      }
    } catch (error) {
      return new Error(error)
    }
    return result
  },
  like: async (moment_id, uid) => {
    const Moment = mongoose.model('Moment')
    const User = mongoose.model('User')
    let updateMoment = {
      $push: { like: uid },
      $inc: { like_num: 1 }
    }
    let updateUser = {
      $push: { "like.moment": moment_id },
      $inc: { like_num: 1 }
    }
    try {
      let moment = await Moment.findByIdAndUpdate(moment_id, updateMoment)
      let user = await User.findByIdAndUpdate(uid, updateUser)
      result = {
        moment_id: moment._id,
        like_num: moment.like_num,
        user: user._id
      }
    } catch (error) {
      return new Error(error)
    }
    return result
  },
  cancelLike: async (moment_id, uid) => {
    const Moment = mongoose.model('Moment')
    const User = mongoose.model('User')
    let updateMoment = {
      $pull: { like: uid },
      $inc: { like_num: -1 }
    }
    let updateUser = {
      $pull: { "like.moment": moment_id },
      $inc: { like_num: -1 }
    }
    try {
      let moment = await Moment.findByIdAndUpdate(moment_id, updateMoment)
      let user = await User.findByIdAndUpdate(uid, updateUser)
      result = {
        moment_id: moment._id,
        like_num: moment.like_num,
        user: user._id
      }
    } catch (error) {
      return new Error(error)
    }
    return result
  },
}
