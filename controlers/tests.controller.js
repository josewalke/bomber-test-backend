const testModel = require('../models/test.model')
const questionModel = require('../models/question.model')


module.exports = {
  createTest,
  getAllTests,
  getTestById,
  createRandomTest
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
  let no_contestadas = []
  var list = await questionModel.find()
  var testQuestions = list.sort(function () { return 0.5 - Math.random() }).splice(0,num)
  // console.log(testQuestions[0]._id)
  // console.log(req.body)

  no_constestadas = testQuestions.map(
    (i)=>{
      return i._id
    }
  )
  // for(var i=0; i<2; i++){
  //   no_contestadas.push(testQuestions[i]._id)
  // }
  console.log(no_constestadas)

  const testBody = {
    user_id: req.body.objectId,
    aciertos: [],
    fallos: [],
    no_contestada: no_constestadas,
    mostrar_solucion: false
  };
  // res.json(testQuestions._id)
   res.json(testBody)

  testModel.create(testBody)
    .then(response => res.json(response))
    .catch(err => {
      res.status(403).json({ error: err });
    });
}