const router = require("express").Router();
const { authenticated, me } = require("../services/auth.service");

const {
  createMessage,
  getAllMessages,
  updateMessages,
  getMessageById
} = require("../controlers/messages.controller");


router.post('/', createMessage)

router.put('/:id', updateMessages)

router.get('/:id', getMessageById)

router.get('/', getAllMessages)

module.exports = router;