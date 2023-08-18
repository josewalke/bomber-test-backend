const pdfModel = require('../models/pdf.model')

module.exports = {
save_pdf,
buscar,
delete_pdf
}
async function save_pdf(req,res){
  pdfModel.create(req.body)
    .then(response => res.json(response))
    .catch(err => {
      res.status(403).json({ error: err });
    });
}

async function buscar(req,res){
  // solo tema
  if(req.body.categoria.length === 0 && req.body.tema.length > 0){
    let body = {
      tema: req.body.tema
    }
  pdfModel
  .find(body)
  .then(response => res.json(response))
    .catch(err => {
      res.status(403).json({ error: err });
    });
  }
  // solo categoria
  if(req.body.categoria.length > 0 && req.body.tema.length === 0){
    let body = {
      categoria: req.body.categoria
    }
  pdfModel
  .find(body)
  .then(response => res.json(response))
    .catch(err => {
      res.status(403).json({ error: err });
    });
  }
  // tema y categoria
  if(req.body.categoria.length > 0 && req.body.tema.length > 0){
    let body = {
      categoria: req.body.categoria,
      tema: req.body.tema
    }
    pdfModel
  .find(body)
  .then(response => res.json(response))
    .catch(err => {
      res.status(403).json({ error: err });
    });
  }


}

async function delete_pdf(req,res){
  pdfModel
  .remove({ _id: req.params.id })
  .then(response => res.json(response))
  .catch(err => handdleError(err, res))


}

function handdleError(err, res) {
  console.log(err)
  //return res.status(400).json(err)
}