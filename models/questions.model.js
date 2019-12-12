const mongoose = require('mongoose')

const questionsSchema = new mongoose.Schema({
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
const questionsModel = mongoose.model('questions', questionsSchema)

module.exports = questionsModel