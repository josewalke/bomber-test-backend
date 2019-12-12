const testModel = require('../models/test.model')
const questionsModel = require('../models/questions.model')


module.exports = {
  createTest,
  getAllTests,
  getTestById,
  createRandomTest,
  getMyTests
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

async function createRandomTest(req, res) {

  let num = 2
  var list = []
  let blanco = []
  list = await questionsModel.find()
  var testQuestions = list.sort(function () { return 0.5 - Math.random() }).splice(0, num)

  blanco = testQuestions.map((i) => {
    return i._id
  })

  const testBody = {
    user_id: res.locals.reboot_user._id,
    title: 'test prueba',
    aciertos: [],
    aciertos_num: 0,
    fallos: [],
    fallos_num: 0,
    nota: 0,
    no_contestadas: blanco,
    mostrar_solucion: false
  }

  testModel.create(testBody)
    .then(response => res.json(response))
    .catch(err => {
      res.status(403).json({ error: err });
    });
}


function getMyTests(req, res) {
  testModel
    .find({user_id: req.params.id})
    .then(response => res.json(response))
    .catch((err) => handdleError(err, res))
}
