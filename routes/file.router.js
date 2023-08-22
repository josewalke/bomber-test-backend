const router = require("express").Router();
const { authenticated, authAdmin } = require("../services/auth.service");

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

router.get('/', authenticated, getAllFiles)
router.get('/pdf', authenticated, getAllPDF)
router.get('/downloads', authenticated, getAllDownloads)
router.get('/media/:id', authenticated, seeMedia)
router.get('/:id', authenticated, getOneFile)
router.post('/', authenticated, authAdmin, postFile)
router.put('/:id', authenticated, authAdmin, updateFile)
router.delete('/:id', authenticated, authAdmin, deleteFile)

module.exports = router