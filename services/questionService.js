const question = require('../dao/question')

module.exports = {
  newQuestion: async (_question) => {
    let result = await question.newQuestion(_question)
    return result
  },
  
}
