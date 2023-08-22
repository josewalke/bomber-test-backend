const mongoose = require('mongoose')

const fileSchema = new mongoose.Schema({
  title: {
    type: String,
    default: 'Sin Título'
  },
  cloudId: {
    type: String
  },
  topic: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'tema',
  },
  format: {
    type: String
  }
})

const FileModel = mongoose.model('file', fileSchema)

module.exports = FileModel