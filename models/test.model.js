const mongoose = require('mongoose')

const testSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },
  title: {
    type: String
  },
  selectedTemas: {
    type: Array
  },
  aciertos: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "questions"
  },
  aciertos_num:{
    type: Number
  },
  fallos: {
    type: [Object],
    ref: "questions"
  },
  fallos_num: {
    type: Number
  },
  no_contestadas: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "questions"
  }],
  mostrar_solucion:{
    type: Boolean
  },
  nota:{
    type: String
  },
  time_start:{
    type: Date
  },
  time_end: {
    type: Date
  }
})
const testModel = mongoose.model('test', testSchema)

module.exports = testModel