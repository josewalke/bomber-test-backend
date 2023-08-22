const FileModel = require('../models/file.model')
const cloudinary = require('../services/cloudinary')

async function getAllFiles(req, res) {
  try {
    const files = await FileModel.find().populate('topic')
    if (!files) return res.status(404).send('No files found')

    return res.status(200).json(files)
  } catch (error) {
    return res.status(500).json({ message: 'Error getting all files', error })
  }
}

async function getOneFile(req, res) {
  try {
    const file = await FileModel.find(req.params.id).populate('topic')
    if (!file) return res.status(404).send('File not found')

    return res.status(200).json(file)
  } catch (error) {
    return res.status(500).json({ message: 'Error getting file', error })
  }
}

async function postFile(req, res) {
  try {
    const uploaded = await uploadFile(req.body.path)
    if (uploaded.error) return (
      res.status(500).json({ message: 'Error uploading to cloudinary', error: uploaded.message })
    )

    req.body.cloudId = uploaded.public_id
    const file = await FileModel.create(req.body)
    return res.status(200).json({ message: 'File uploaded', file })
  } catch (error) {
    return res.status(500).json({ message: 'Error posting file', error })
  }
}

async function updateFile(req, res) {
  try {
    if(req.body.path) await updateFile(req.body.path)

    const file = await FileModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!file) return res.status(404).send('File not found')

    return res.status(200).json({ message: 'File updated', file })
  } catch (error) {
    return res.status(500).send({ message: 'Error updating file', error })
  }
}

async function uploadFile(file) {
  const options = {
    use_filename: true,
    unique_filename: true,
    overwrite: true
  }

  try {
    const result = await cloudinary.uploader(file, options)
    return result
  } catch (error) {
    return { error: true, message: error }
  }
}

async function deleteFile(req, body) {
  try {
    const file = await FileModel.findByIdAndDelete(req.params.id)
    if (!file) return res.status(404).send('File not found')

    const {result} = cloudinary.uploader.destroy(file.cloudId)
    if( result === 'ok' ) {
      return res.status(200).send('File deleted')
    } else {
      throw new Error ('Error deleiting from cloudinary')
    }
  } catch (error) {
    return res.status(500).send({ message: 'Error deleiting file', error })
  }
}

module.exports = {
  getAllFiles,
  getOneFile,
  postFile,
  updateFile,
  deleteFile
}