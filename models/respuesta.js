const mongoose = require('mongoose')

const respuestaSchema = new mongoose.Schema({
  id_respuesta: {
    type: Number
  },
  id_pregunta: {
    type: Number
  },
  respuesta: {
    type: String
  },
  correcta:{
    type: Number
  },
  foto:{
    type: String
  }
})
const respuestaModel = mongoose.model('respuesta', respuestaSchema)

module.exports = respuestaModel