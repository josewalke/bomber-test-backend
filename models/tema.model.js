const mongoose = require('mongoose')

const temaSchema = new mongoose.Schema({
  name: {
    type: String
  }
})
const temaModel = mongoose.model('tema', temaSchema)

module.exports = temaModel