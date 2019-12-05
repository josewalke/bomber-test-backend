const temaModel = require('../models/tema.model')

module.exports = {
  createTema,
  getAllTemas,
  getTemaById,
  updateTema
}

function createTema(req, res) {
  console.log('crear Tema')

  temaModel.create(req.body)
    .then(response => res.json(response))
    .catch(err => {
      res.status(403).json({ error: err });
    });
}

function getAllTemas(req, res) {
  console.log('todos los Temas')
  questionsModel
    .find()
    .then(response => res.json(response))
    .catch((err) => handdleError(err, res))
}

function getTemaById(req, res) {
  console.log("un solo tema")
  questionsModel
    .findById(req.params.id)
    .then(response => res.json(response))
    .catch((err) => handdleError(err, res))
}

function updateTema(req, res) {
  questionsModel
    .findByIdAndUpdate(req.params.id, req.body)
    .then(response => res.json('actualizado correctamente'))
    .catch((err) => handdleError(err, res))
}