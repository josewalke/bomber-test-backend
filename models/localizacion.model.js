const mongoose = require('mongoose')

const localizacionSchema = new mongoose.Schema({
  telefono: {
    type: String
  },
  correo: {
    type: String
  },
  direccion: {
    type: String
  }
})
const localizacionModel = mongoose.model('localizacion', localizacionSchema)

module.exports = localizacionModel