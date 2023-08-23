const FileModel = require('../models/file.model')
const cloudinary = require('../services/cloudinary')

async function getAllFiles(req, res) {
  try {
    const files = await FileModel.find().populate('topic')
    if (!files) return res.status(404).send('No files found')

    return res.status(200).json(files)
  } catch (error) {
    return res.status(500).json({ message: 'Error getting all files', error: error })
  }
}

async function getAllPDF(req, res) {
  try {
    const files = await FileModel.find({ format: 'pdf' }).populate('topic')
    if (!files) return res.status(404).send('No files found')

    return res.status(200).json(files)
  } catch (error) {
    return res.status(500).json({ message: 'Error getting all PDFs', error: error })
  }
}

async function getAllDownloads(req, res) {
  try {
    const files = await FileModel.find({ format: { $ne: 'pdf'} }).populate('topic')
    if (!files) return res.status(404).send('No files found')

    return res.status(200).json(files)
  } catch (error) {
    return res.status(500).json({ message: 'Error getting all PDFs', error: error })
  }
}

async function getOneFile(req, res) {
  try {
    const file = await FileModel.findById(req.params.id).populate('topic')
    if (!file) return res.status(404).send('File not found')

    return res.status(200).json(file)
  } catch (error) {
    return res.status(500).json({ message: 'Error getting file', error: error })
  }
}

async function postFile(req, res) {
  try {
    const format = req.file.originalname.split('.').pop().toLowerCase()
    const uploaded = await uploadFile(req.file, format)

    if (uploaded.error) return (
      res.status(500).json({ message: 'Error uploading to cloudinary', error: uploaded.message })
    )

    req.body.cloudId = uploaded.public_id
    req.body.format = format

    const file = await FileModel.create(req.body)
    return res.status(200).json({ message: 'File uploaded', file: file })
  } catch (error) {
    return res.status(500).json({ message: 'Error posting file', error: error })
  }
}

async function updateFile(req, res) {
  try {
    const file = await FileModel.findByIdAndUpdate(req.params.id, req.body)
    if (!file) return res.status(404).send('File not found')

    return res.status(200).json({ message: 'File updated', file: file })
  } catch (error) {
    return res.status(500).json({ message: 'Error updating file', error: error })
  }
}

async function uploadFile(file, format) {

  const options = {
    use_filename: true,
    unique_filename: true,
    overwrite: true,
    resource_type: getFormat(format)
  }

  try {
    // Se debe usar una promesa porque 'await cloudinary.uploader.upload_stream devuelve un stream antes de terminar de subir el archivo.
    return new Promise((resolve, reject) => { 
      cloudinary.uploader.upload_stream(options, (err, success) => {
        if (err) return reject({ error: true, message: err });
        return resolve(success);
      }).end(file.buffer);
    })
  } catch (error) {
    return { error: true, message: error }
  }
}

function getFormat(format) {
  if (['jpg', 'jpeg', 'png', 'gif'].includes(format)) {
    return 'image';
  } else {
    return 'raw'
  }
}

async function deleteFile(req, res) {
  try {
    const file = await FileModel.findByIdAndDelete(req.params.id)
    if (!file) return res.status(404).send('File not found')

    const {result} = await cloudinary.uploader.destroy(file.cloudId)
    if( result === 'ok' ) {
      return res.status(200).send('File deleted')
    } else {
      throw new Error ('Error deleiting from cloudinary')
    }
  } catch (error) {
    return res.status(500).send({ message: 'Error deleiting file', error: error })
  }
}

async function seeMedia(req, res) {
  try {
    const file = await FileModel.findById(req.params.id)
    if (!file) return res.status(404).send('File not found')

    const options = {
      resource_type: getFormat(file.format)
    }

    const data = await cloudinary.api.resource(file.cloudId, options)
    return res.status(200).json(data)
  } catch (error) {
    return res.status(500).send({ message: 'Error fetching file', error: error })
  }
}

module.exports = {
  getAllFiles,
  getAllPDF,
  getAllDownloads,
  getOneFile,
  postFile,
  updateFile,
  deleteFile,
  seeMedia
}