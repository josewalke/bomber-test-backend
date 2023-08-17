const router = require("express").Router()
const { authenticated, authAdmin } = require("../services/auth.service");

const {
  getAllVideos,
  getOneVideo,
  createVideo,
  updateVideo,
  deleteVideo
} = require('../controlers/video.controller')

router.get('/', authenticated, getAllVideos)
router.get('/:id', authenticated, getOneVideo)
router.post('/', authenticated, authAdmin, createVideo)
router.put('/:id', authenticated, authAdmin, updateVideo)
router.delete('/:id', authenticated, authAdmin, deleteVideo)

module.exports = router