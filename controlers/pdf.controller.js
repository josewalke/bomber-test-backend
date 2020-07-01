const pdfModel = require('../models/pdf.model')

module.exports = {
save_pdf
}
async function save_pdf(req,res){

  pdfModel.create(req.body)
    .then(response => res.json(response))
    .catch(err => {
      res.status(403).json({ error: err });
    });
}