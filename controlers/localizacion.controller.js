const localizacionModel = require('../models/localizacion.model')

module.exports = {
  crearDatos,
  getAllSuscription,
  updateLocalizacion
}

function crearDatos(req,res){
  const body = {
    telefono: req.body.telefono,
    correo: req.body.correo,
    direccion: req.body.direccion,
  }
  localizacionModel.create(body)
    .then(response => res.json(response))
    .catch(err => {
      res.status(403).json({ error: err });
    });
}

function getAllSuscription(req,res){
  localizacionModel
    .find()
    .then(response => res.json(response))
    .catch((err) => handdleError(err, res))
}

function updateLocalizacion(req,res){
  localizacionModel
    .findByIdAndUpdate(req.params.id, req.body)
    .then(response => res.json('actualizado correctamente'))
    .catch((err) => handdleError(err, res))
}

function handdleError(err, res) {
  console.log(err)
  //return res.status(400).json(err)
}