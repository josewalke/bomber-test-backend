const testModel = require("../models/test.model");
const questionsModel = require("../models/questions.model");

module.exports = {
  getAllTests,
  getTestById,
  createRandomTest,
  getMyTests,
  createConfigTest
};

function getAllTests(req, res) {
  testModel
    .find()
    .then(response => res.json(response))
    .catch(err => handdleError(err, res));
}

async function getTestById(req, res) {
  testModel
    .findById(req.params.id)
    .then(async response => {
      const populado = await response.populate("no_contestadas").execPopulate();
      res.json(populado);
    })
    .catch(err => handdleError(err, res));
}

function updateTest(req, res) {
  testModel
    .findByIdAndUpdate(req.params.id, req.body)
    .then(response => res.json("actualizado correctamente"))
    .catch(err => handdleError(err, res));
}

async function createRandomTest(req, res) {
  const now =  new Date()
  let date = now.getDate() +"/"+ now.getMonth()+1 +"/"+ now.getFullYear() + " - " + now.getHours()+ ":" + now.getMinutes(9)
  let num = 20;
  var list = [];
  let blanco = [];
  list = await questionsModel.find();
  var testQuestions = list
    .sort(function() {
      return 0.5 - Math.random();
    })
    .splice(0, num);

  blanco = testQuestions.map(i => {
    return i._id;
  });
  const testBody = {
    user_id: res.locals.reboot_user._id,
    title: "Test creado el " + date,
    aciertos: [],
    aciertos_num: 0,
    fallos: [],
    fallos_num: 0,
    nota: 0,
    no_contestadas: blanco,
    mostrar_solucion: false
  };

  testModel
    .create(testBody)

    .then(async response => {
      const populado = await response.populate("no_contestadas").execPopulate();
      res.json(populado);
    })
    .catch(err => {
      res.status(403).json({ error: err });
    });
}

async function createConfigTest(req, res) {
  let blanco = []
  var list = []
  let numSelected = req.body.number
  let selected = req.body.temas
  list = await questionsModel.find()
  var allQuestions = list.sort(function() {
    return 0.5 - Math.random();
  })
  var testQuestions = []
  if (selected.length === numSelected){
    selected.forEach(element => {
      let temaQuestions = allQuestions.filter(tq => tq.tema_id == element)
      let q = temaQuestions.splice(0, 1)
      testQuestions.push(q[0])
    });
  }
  if (selected.length > numSelected){
    selected = selected.sort(function() {
      return 0.5 - Math.random()
    }).splice(0, numSelected)
    selected.forEach(element => {
      let temaQuestions = allQuestions.filter(tq => tq.tema_id == element)
      let q = temaQuestions.splice(0, 1)
      testQuestions.push(q[0])
    });
  }
  if (selected.length < numSelected){
    let div = numSelected / selected.length
    let dif = numSelected % selected.length
    let newSelected = []
    while(div-1 > 0){
      newSelected = selected.concat(newSelected)
      div -= 1
    }
    newSelected = newSelected.concat(selected = selected.sort(function() {
      return 0.5 - Math.random()
    }).splice(0, dif))
    newSelected.forEach(element => {
      let temaQuestions = allQuestions.filter(tq => tq.tema_id == element)
      let q = temaQuestions.splice(0, 1)
      let i = allQuestions.findIndex(x => x._id === q[0]._id)
      testQuestions.push(q[0])
      allQuestions.splice(i, 1)

    });
  }
  blanco = testQuestions.map(i => {
    return i._id;
  });
  const testBody = {
    user_id: res.locals.reboot_user._id,
    title: req.body.name,
    aciertos: [],
    aciertos_num: 0,
    fallos: [],
    fallos_num: 0,
    nota: 0,
    no_contestadas: blanco,
    mostrar_solucion: req.body.correctorSwitch,
    selectedTemas: req.body.selected,
  };

  testModel
    .create(testBody)

    .then(async response => {
      const populado = await response.populate("no_contestadas").execPopulate();
      res.json(populado);
    })
    .catch(err => {
      res.status(403).json({ error: err });
    });
}

function getMyTests(req, res) {
  testModel
    .find({ user_id: req.params.id })
    .then(response => res.json(response))
    .catch(err => handdleError(err, res));
}

function handdleError(err, res) {
  return res.status(400).json(err);
}
