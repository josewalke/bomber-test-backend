const mongoose = require('mongoose')

const questionSchema = new mongoose.Schema({
  enunciado: {
    type: String
  },
  imagen_url: {
    type: String
  },
  answers_wrong: {
    type: [String]
  },
  answers_correct: {
    type: String
  },
  tema_id: {
    type: mongoose.Schema.Types.ObjectId
  },
  category: {
    type: String
  },
  difficulty:{
    type: String
  }
})
const questionModel = mongoose.model('question', questionSchema)

module.exports = questionModel