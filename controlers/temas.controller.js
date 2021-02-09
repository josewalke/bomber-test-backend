const temaModel = require('../models/tema.model')

module.exports = {
  createTema,
  getAllTemas,
  updateTema,
  deleteTemaById,
  allTemas
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
  console.log('todas los temas')
  temaModel
    .find()
    .then(response => {
      console.log(response.length)
      res.json(response)})
    .catch((err) => handdleError(err, res))
}

function allTemas(req,res){
  console.log('TODOS LOS TEMAS')
  temaModel
    .find()
    .then(response => {
      console.log(response.length)
      res.json(response)})
    .catch((err) => handdleError(err, res))
}

function updateTema(req, res) {
  temaModel
    .findByIdAndUpdate({_id: req.params.id}, req.body)
    .then(response => res.json('actualizado correctamente'))
    .catch((err) => handdleError(err, res))
}

function deleteTemaById(req, res) {
  temaModel
    .remove({ _id: req.params.id })
    .then(response => res.json(response))
    .catch(err => handdleError(err, res))
}