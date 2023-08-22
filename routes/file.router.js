const router = require("express").Router();
const { authenticated, authAdmin } = require("../services/auth.service");

const {
  getAllFiles,
  getOneFile,
  postFile,
  updateFile,
  deleteFile
} = require('../controlers/file.controller')

router.get('/', authenticated, getAllFiles)
router.get('/:id', authenticated, getOneFile)
router.post('/', authenticated, authAdmin, postFile)
router.put('/:id', authenticated, authAdmin, updateFile)
router.delete('/:id', authenticated, authAdmin, deleteFile)

module.exports = router