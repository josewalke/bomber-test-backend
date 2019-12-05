const messageModel = require('../models/messages.model')

module.exports = {
  createMessage,
  getAllMessages,
  updateMessages,
  getMessageById
}

function createMessage(req, res) {
  console.log('crear Duda')

  messageModel.create(req.body)
    .then(response => res.json(response))
    .catch(err => {
      res.status(403).json({ error: err });
    });
}

function getAllMessages(req, res) {
  console.log('todos las dudas')
  messageModel
    .find()
    .then(response => res.json(response))
    .catch((err) => handdleError(err, res))
}

function updateMessages(req, res) {
  messageModel
    .findByIdAndUpdate(req.params.id, req.body)
    .then(response => res.json('actualizado correctamente'))
    .catch((err) => handdleError(err, res))
}

function getMessageById(req, res) {
  console.log("una sola duda");
  messageModel.findById(req.params.id)
    .then(response => res.json(response))
    .catch(err => handdleError(err, res));
}