const router = require("express").Router();
const { authenticated, authAdmin } = require("../services/auth.service")
const multer = require('multer')

const {
  getAllFiles,
  getAllPDF,
  getAllDownloads,
  getOneFile,
  postFile,
  updateFile,
  deleteFile,
  seeMedia
} = require('../controlers/file.controller')

const storage = multer.memoryStorage()
const upload = multer({ storage })

router.get('/', authenticated, authAdmin, getAllFiles)
router.get('/pdf', authenticated, getAllPDF)
router.get('/downloads', authenticated, getAllDownloads)
router.get('/media/:id', authenticated, seeMedia)
router.get('/:id', authenticated, getOneFile)
router.post('/', authenticated, authAdmin, upload.single('file'), postFile)
router.put('/:id', authenticated, authAdmin, updateFile)
router.delete('/:id', authenticated, authAdmin, deleteFile)

module.exports = router