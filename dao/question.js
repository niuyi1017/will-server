const mongoose = require('mongoose')

module.exports = {
  newQuestion: async (_question) => {
    const Question = mongoose.model('Question')
    const User = mongoose.model('User')
    let uid = _question.author
    console.log(uid)
    let result = {}
    try {
      let question = new Question(_question)
      let savedQuestion =  await question.save()
      let question_id = savedQuestion._id
      let update = {
          $push:{ "post.question":question_id},
          $inc: { post_num: 1 }
      }
      let user = await User.findByIdAndUpdate(uid, update)
      result = {
        question_id,
        uid: user._id
      }
    }catch (error) {
      return new Error(error)
    }
    return result
  },
  questions: async (page, num) => {
    const Question = mongoose.model('Question')
    let result = await Question.find({})
      .skip(page * num)
      .limit(num)
    return result
  },
  question: async (question_id) => {
    const Question = mongoose.model('Question')
    let result = await Question.findByIdAndUpdate(question_id, { $inc: { read_num: 1 }})
    return result
  },
  favour: async (question_id,uid) => {
    const Question = mongoose.model('Question')
    const User = mongoose.model('User')
    let updateQuestion = {
      $push: { favour: uid },
      $inc: { favour_num: 1 }
    }
    let updateUser = {
      $push: { "favour.question": question_id },
      $inc: { favour_num: 1 }
    }
    try {
      let question = await Question.findByIdAndUpdate(question_id, updateQuestion)
      let user = await User.findByIdAndUpdate(uid, updateUser)
      result = {
        question_id: question._id,
        favour_num: question.favour_num,
        user: user._id
      }
    } catch (error) {
      return new Error(error)
    }
    return result
  },
  cancelFavour: async (question_id, uid) => {
    const Question = mongoose.model('Question')
    const User = mongoose.model('User')
    let updateQuestion = {
      $pull: { favour: uid },
      $inc: { favour_num: -1 }
    }
    let updateUser = {
      $pull: { "favour.question": question_id },
      $inc: { favour_num: -1 }
    }
    try {
      let question = await Question.findByIdAndUpdate(question_id, updateQuestion)
      let user = await User.findByIdAndUpdate(uid, updateUser)
      result = {
        question_id: question._id,
        favour_num: question.favour_num,
        user: user._id
      }
    } catch (error) {
      return new Error(error)
    }
    return result
  },
}
