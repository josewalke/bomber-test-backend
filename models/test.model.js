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
  // aciertos: {
  //   type: [mongoose.Schema.Types.ObjectId],
  //   ref: "questions"
  // },
  // aciertos_num:{
  //   type: Number
  // },
  // fallos: {
  //   type: [Object],
  //   ref: "questions"
  // },
  // fallos_num: {
  //   type: Number
  // },
  check: {
    type: {}
  },
  testCheck:{
    type:{}
  },
  respuestas: {
    type: [Object],
    ref: "questions"
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

  desafio:{
    type:Boolean
  },
  time_start:{
    type: Number,
    default: new Date().getTime()
  },
  time_end: {
    type: String,
    default: 'ilimitado'
  },
  time_end2: {
    type: String,
    default: null
  }
})
const testModel = mongoose.model('test', testSchema)

module.exports = testModel