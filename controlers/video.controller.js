const VideoModel = require('../models/video.model')

async function getAllVideos(req, res) {
  try {
    const videos = await VideoModel.find()
    if (!videos) return res.status(404).send('No videos found')

    return res.status(200).json(videos)
  } catch (error) {
    return res.status(500).json({ message:'Error getting all videos', error: error})
  }
}

async function getOneVideo(req, res) {
  try {
    const video = await VideoModel.findById(req.params.id)
    if (!video) return res.status(404).send('Video not found')

    return res.status(200).json(video)
  } catch (error) {
    return res.status(500).send({ message: 'Error getting video', error: error })
  }
}

async function createVideo(req, res) {
  try {
    const video = await VideoModel.create(req.body)

    return res.status(200).json({ message: 'Video created', video: video })
  } catch (error) {
    return res.status(500).send({ message: 'Error creating video', error: error })
  }
}

async function updateVideo(req, res) {
  try {
    const video = await VideoModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!video) return res.status(404).send('Video not found')

    return res.status(200).json({ message: 'Video updated', video: video })
  } catch (error) {
    return res.status(500).send({ message: 'Error updating video', error: error })
  }
}

async function deleteVideo(req, res) {
  try {
    const video = await VideoModel.findByIdAndDelete(req.params.id)
    if (!video) return res.status(404).send('Video not found')

    return res.status(200).json({ message: 'Video deleted'})
  } catch (error) {
    return res.status(500).send({ message: 'Error deleiting video', error: error })
  }
}

module.exports = {
  getAllVideos,
  getOneVideo,
  createVideo,
  updateVideo,
  deleteVideo
}