const mongoose = require('mongoose')

const pdfSchema = new mongoose.Schema({
  name: {
    type: String
  },
  categoria: {
    type: String
  },
  suscription_type: {
    type: String
  },
  tema: {
    type: String
  },
  transaction_id:{
    type: String
  },
  currency:{
    type: String
  },
  src:{
    type: String
  },
  width:{
    type: String
  },
  height:{
    type: String
  },
  frameborder:{
    type: String
  },
  marginwidth:{
    type: String
  },
  scrolling:{
    type: String
  },
  style:{
    type: String
  }
})
const pdfModel = mongoose.model('pdf', pdfSchema)

module.exports = pdfModel
