const messageModel = require('../models/messages.model')

module.exports = {
  createMessage,
  getAllMessages,
  updateMessages,
  getMessageById
}

function createMessage(req, res) {
  const body ={
    user_id: req.body.userId,
    respuesta_leida: req.body.respuesta_leida,
    pregunta_id: req.body.questionId,
    pregunta: req.body.message,
    respuesta: req.body.respuesta,
    explicacion: req.body.explicacion,
    verificada: req.body.verificada,
    type: req.body.type,
    test_id: req.body.test_id
  }
  // console.log(body)
  messageModel.create(body)
    .then(response => res.json(response))
    .catch(err => {
      res.status(403).json({ error: err });
    });
}

async function getAllMessages(req, res) {
  try {
    const messages = await messageModel.find().populate('user_id')
    return res.status(200).json(messages)
  } catch (error) {
    handdleError(error, res)
  }
}

function updateMessages(req, res) {
  messageModel
    .findByIdAndUpdate(req.params.id, req.body)
    .then(response => res.json('actualizado correctamente'))
    .catch((err) => handdleError(err, res))
}

function getMessageById(req, res) {
  console.log("una sola duda");
  messageModel.find({user_id: req.params.id})
    .then(response => res.json(response))
    .catch(err => handdleError(err, res));
}

function handdleError(err, res) {
  console.log(err)
  //return res.status(400).json(err)
}