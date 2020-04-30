const url_claseModel = require("../models/url_clase.model");

module.exports = {
  postURL,
  getURL,
  putURL
};

function postURL(req,res){
  var body = {
    direccion: 'sin direccion',
    contraseña: 'sin contraseña'
  }
  url_claseModel
    .create(body)
    .then(response => res.json(response))
    .catch(err => {
      res.status(403).json({ error: err });
    });
}

async function getURL(req,res){
  url_claseModel
  .find()
  .then(response => res.json(response))
    .catch(err => {
      res.status(403).json({ error: err });
    });
}

async function putURL(req,res){
  console.log(req.body)
  url_claseModel
  .findByIdAndUpdate(req.params.id, req.body)
    .then(response => res.json('actualizado correctamente'))
    .catch((err) => handdleError(err, res))
}