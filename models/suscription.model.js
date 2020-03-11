const mongoose = require('mongoose')

const suscriptionSchema = new mongoose.Schema({
  name: {
    type: String
  },
  apartado1: {
    type: String
  },
  apartado2: {
    type: String
  },
  apartado3: {
    type: String
  },
  apartado4: {
    type: String
  },
  precio: {
    type: String
  }
})
const suscriptionModel = mongoose.model('suscription', suscriptionSchema)

module.exports = suscriptionModel