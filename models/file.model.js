const mongoose = require('mongoose')

const fileSchema = new mongoose.Schema({
  title: {
    type: String,
    default: 'Sin Título'
  },
  cloudId: {
    type: String
  },
  pages: {
    type: Number
  },
  topic: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'tema',
  },
  format: {
    type: String
  },
  auxiliary: {
    type: Boolean,
    default: false
  }
})

const FileModel = mongoose.model('file', fileSchema)

module.exports = FileModel