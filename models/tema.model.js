const mongoose = require('mongoose')

const temaSchema = new mongoose.Schema({
  name: {
    type: String
  },
  category:{
    type: String
  },
  // borrar lo de abajo
  id_tema:{
    type: Number
  }
})
const temaModel = mongoose.model('tema', temaSchema)

module.exports = temaModel