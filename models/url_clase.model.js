const mongoose = require('mongoose')

const url_claseSchema = new mongoose.Schema({
  direccion: {
    type: String
  },
  contraseña:{
    type: String
  },
})
const url_claseModel = mongoose.model('url_clase', url_claseSchema)

module.exports = url_claseModel