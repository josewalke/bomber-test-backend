const testModel = require('../models/test.model')

module.exports = {
  createTest
}

function createTest(req, res) {

  const testBody = {
    user_id: req.body.me,
    aciertos: req.body.aciertos,
    fallos: req.body.fallos,
    no_contestada: req.body.blanco,
    mostrar_solucion: req.body.mostrar
  };

  testModel.create(testBody)
    .then(response => res.json(response))
    .catch(err => {
      res.status(403).json({ error: err });
    });
}