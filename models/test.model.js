const mongoose = require('mongoose')

const testSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },
  aciertos: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "question"
  },
  fallos: {
    type: [Object],
    ref: "question"
  },
  no_contestadas: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "question"
  },
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