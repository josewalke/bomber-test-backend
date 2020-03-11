const suscriptionModel = require('../models/suscription.model')

module.exports = {
crearSuscription,
getAllSuscription,
updateSuscription
}

function crearSuscription(req, res) {
  const body = {
    name: req.body.name,
    apartado1: req.body.apartado1,
    apartado2: req.body.apartado2,
    apartado3: req.body.apartado3,
    apartado4: req.body.apartado4,
    precio: req.body.precio
  }
  suscriptionModel.create(body)
    .then(response => res.json(response))
    .catch(err => {
      res.status(403).json({ error: err });
    });
}

function getAllSuscription(req,res){
  suscriptionModel
    .find()
    .then(response => res.json(response))
    .catch((err) => handdleError(err, res))
}

function updateSuscription(req,res){
  suscriptionModel
    .findByIdAndUpdate(req.params.id, req.body)
    .then(response => res.json('actualizado correctamente'))
    .catch((err) => handdleError(err, res))
}