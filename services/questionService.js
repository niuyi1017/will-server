const question = require('../dao/question')

module.exports = {
  newQuestion: async (_question) => {
    let result = await question.newQuestion(_question)
    return result
  },
  questions: async (page, num) => {
    let result = await question.questions(page, num)
    return result
  },
  question: async (question_id) => {
    let result = await question.question(question_id)
    return result
  },
  favour: async (question_id, uid) => {
    let result = await question.favour(question_id, uid)
    return result
  },
  cancelFavour: async (question_id, uid) => {
    let result = await question.cancelFavour(question_id, uid)
    return result
  },
}
