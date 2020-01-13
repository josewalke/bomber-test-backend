const temaModel = require('../models/tema.model')

module.exports = {
  createTema,
  getAllTemas,
  updateTema,
  deleteTemaById
}

function createTema(req, res) {
  console.log('crear Tema')
  console.log(req.body)

  temaModel.create(req.body)
    .then(response => res.json(response))
    .catch(err => {
      res.status(403).json({ error: err });
    });
}

function getAllTemas(req, res) {
  console.log('todos los Temas')
  temaModel
    .find()
    .then(response => res.json(response))
    .catch((err) => handdleError(err, res))
}

function updateTema(req, res) {
  temaModel
    .findByIdAndUpdate(req.params.id, req.body)
    .then(response => res.json('actualizado correctamente'))
    .catch((err) => handdleError(err, res))
}

function deleteTemaById(req, res) {
  temaModel
    .remove({ _id: req.params.id })
    .then(response => res.json(response))
    .catch(err => handdleError(err, res))
}