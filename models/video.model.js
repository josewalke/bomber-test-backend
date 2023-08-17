const mongoose = require('mongoose')

const videoSchema = new mongoose.Schema({
  title: {
    type: String,
    default: 'Sin título',
  },
  topic: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'tema',
    required: [true, 'Por favor, introducir Tema']
  },
  url: {
    type: String,
    required: [true, 'Please insert a URL']
  }
})

const VideoModel = mongoose.model('video', videoSchema)

module.exports = VideoModel