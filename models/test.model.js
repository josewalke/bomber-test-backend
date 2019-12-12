const mongoose = require('mongoose')

const testSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },
  title: {
    type: String
  },
  aciertos: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "questions"
  },
  fallos: {
    type: [Object],
    ref: "questions"
  },
  no_contestadas: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "questions"
  }],
  // no_contestadas: {
  //   type: String
  // },
  mostrar_solucion:{
    type: Boolean
  },
  nota:{
    type: Number
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