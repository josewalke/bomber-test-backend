const testModel = require('../models/test.model')


module.exports = {
  createTest,
  getAllTests,
  getTestById
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

function getAllTests(req, res) {
  console.log('todos los tests')
  testModel
    .find()
    .then(response => res.json(response))
    .catch((err) => handdleError(err, res))
}

function getTestById(req, res) {
  console.log("un solo test")
  testModel
    .findById(req.params.id)
    .then(response => res.json(response))
    .catch((err) => handdleError(err, res))
}

function updateTest(req, res) {
  testModel
    .findByIdAndUpdate(req.params.id, req.body)
    .then(response => res.json('actualizado correctamente'))
    .catch((err) => handdleError(err, res))
}