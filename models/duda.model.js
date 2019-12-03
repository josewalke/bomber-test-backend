const mongoose = require('mongoose')

const dudaSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId
  },
  pregunta_id: {
    type: mongoose.Schema.Types.ObjectId
  },
  pregunta: {
    type: String
  },
  respuesta: {
    type: String
  },
  respuesta_leida: {
    type: Boolean
  }
})
const temaModel = mongoose.model('tema', temaSchema)

module.exports = temaModel