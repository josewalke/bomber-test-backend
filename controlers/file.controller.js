const FileModel = require('../models/file.model')
const cloudinary = require('../services/cloudinary')
const pdfjs = require('pdfjs-dist')
const { createCanvas } = require('canvas')

pdfjs.GlobalWorkerOptions.workerSrc = false;

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

    if (format === 'pdf') {
      req.body.pdfPages = []
      uploaded.forEach(page => req.body.pdfPages.push(page.public_id))
    } else {
      req.body.cloudId = uploaded.public_id
    }
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
    if (format === 'pdf') {
      const images = await convertPDFToImages(file.buffer);
      const uploadedImages = [];
      for (const image of images) {
        const result = await cloudinary.uploader.upload(image, {
          resource_type: 'image',
          format: 'png'
        });
        uploadedImages.push(result);
      }

      return uploadedImages;
    } else {
      return new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(options, (err, success) => {
          if (err) return reject({ error: true, message: err });
          return resolve(success);
        }).end(file.buffer);
      });
    }
    // Se debe usar una promesa porque 'await cloudinary.uploader.upload_stream devuelve un stream antes de terminar de subir el archivo.
  } catch (error) {
    return { error: true, message: error }
  }
}

async function convertPDFToImages(pdfBuffer) {
  const data = new Uint8Array(pdfBuffer)
  var pdf = await pdfjs.getDocument({data}).promise

  const totalPages = pdf.numPages
  const images = []

  for (let i = 1; i <= totalPages; i++) {
    const page = await pdf.getPage(i)
    const viewport = page.getViewport({ scale: 1 })

    const canvas = createCanvas(viewport.width, viewport.height)
    const context = canvas.getContext('2d')

    await page.render({
      canvasContext: context,
      viewport: viewport
    }).promise

    const image = canvas.toDataURL()
    images.push(image)
  }

    return images
}

function getFormat(format) {
  if (['jpg', 'jpeg', 'png', 'gif', 'pdf'].includes(format)) {
    return 'image';
  } else {
    return 'raw'
  }
}

async function deleteFile(req, res) {
  try {
    const file = await FileModel.findByIdAndDelete(req.params.id)
    if (!file) return res.status(404).send('File not found')
    if (file.format === 'pdf') {
      const result = await Promise.all(file.pdfPages.map(async (page) => {
        const data = await cloudinary.uploader.destroy(page)
        return data.result
      }))

      if (result.every(i => i === 'ok')) {
        return res.status(200).send('File deleted')
      } else {
        throw new Error('Error deleting from cloudinary')
      }
    } else {
      const data = await cloudinary.uploader.destroy(file.cloudId)

      if (data.result === 'ok') {
        return res.status(200).send('File deleted')
      } else {
        throw new Error('Error deleting from cloudinary')
      }
    }
  } catch (error) {
    console.log(error)
    return res.status(500).send({ message: 'Error deleting file', error: error })
  }
}

async function seeMedia(req, res) {
  try {
    const file = await FileModel.findById(req.params.id)
    if (!file) return res.status(404).send('File not found')

    const options = {
      resource_type: getFormat(file.format)
    }
    if (file.format === 'pdf') {
      const pages = await Promise.all(file.pdfPages.map(async (page) => {
        const data = await cloudinary.api.resource(page, options)
        return data
      }))
      return res.status(200).json(pages)
    } else {
      const data = await cloudinary.api.resource(file.cloudId, options)
      return res.status(200).json(data)
    }
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