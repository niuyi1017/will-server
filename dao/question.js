const mongoose = require('mongoose')

module.exports = {
  newQuestion: async (_question) => {
    const Question = mongoose.model('Question')
    let result = ''
    try {
      let question = new Question(_question)
      await question.save()
      result = "发布成功"
    }catch (error) {
      return new Error(error)
    }
    return result
  },
}