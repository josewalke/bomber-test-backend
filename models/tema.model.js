const mongoose = require('mongoose')

const temaSchema = new mongoose.Schema({
  name: {
    type: String
  },
  category:{
    type: String
  },
  id_tema:{
    type: Number
  },
  visible:{
    type: Boolean,
    default: false
  }
})
const temaModel = mongoose.model('tema', temaSchema)

module.exports = temaModel