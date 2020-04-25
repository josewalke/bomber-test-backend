const mongoose = require('mongoose')

const relacion_pregunta_temaSchema = new mongoose.Schema({
  id_rel_pre_tem: {
    type: String
  },
  id_pregunta: {
    type: String
  },
  id_tema: {
    type: String
  }
})
const relacion_pregunta_temaModel = mongoose.model('relacion_pregunta_tema', relacion_pregunta_temaSchema)

module.exports = relacion_pregunta_temaModel