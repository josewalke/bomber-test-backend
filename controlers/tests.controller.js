const testModel = require("../models/test.model");
const questionsModel = require("../models/questions.model");

module.exports = {
  getAllTests,
  getTestById,
  createRandomTest,
  getMyTests,
  createConfigTest,
  testAnswer,
  postExam,
  deleteDesafio
};

function getAllTests(req, res) {
  testModel
    .find()
    .then(response => res.json(response))
    .catch(err => handdleError(err, res));
}

function postExam(req,res){
  testModel
    .create(req.body)
    .then(response => res.json(response))
    .catch(err => {
      res.status(403).json({ error: err });
    });
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

// function updateTest(req, res) {
//   console.log('❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤')
//   console.log(req.body)
//   testModel
//   .findByIdAndUpdate(req.params.id, req.body)
//   .then(response => res.json("actualizado correctamente"))
//   .catch(err => handdleError(err, res));
// }

function testAnswer(req, res){
    let num = req.body.numero
    let resp = req.body.respuesta
    let guess = resp.guess

    testModel
      .findById(req.params.id).then(test =>{
        let check = test.testCheck
        let newCheck = {right: check.right, wrong: check.wrong, blank: check.blank}
        guess === true ? newCheck.right++ : newCheck.wrong++
        newCheck.blank--
        test.testCheck = newCheck
        test.respuestas.set(num, resp)

        test.save().then(response => res.json())
      })
    .catch(err => console.log(err))
}

async function createRandomTest(req, res) {
  const now =  new Date()
  let date = now.getDate() +"/"+ now.getMonth()+1 +"/"+ now.getFullYear() + " - " + now.getHours()+ ":" + now.getMinutes(00)
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

  let respuestas = []
  blanco.forEach( q => {
    respuestas.push({ id: q, answered:false})
  })

  let testCheck = { right: 0, wrong: 0, blank: blanco.length}

  const testBody = {
    user_id: res.locals.reboot_user._id,
    title: "Test -" + date,
    testCheck: testCheck,
    aciertos: [],
    aciertos_num: 0,
    fallos: [],
    fallos_num: 0,
    respuestas: respuestas,
    nota: false,
    end: false,
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
  const testName = req.body.name
  const numSelected = req.body.number
  const selected = req.body.temas
  const correctorSwitch  = req.body.correction
  let list = []
  let blanco = []
  list = await questionsModel.find();

  if(selected.length === 0){
    var testQuestions = list
    .sort(function() {
      return 0.5 - Math.random();
    })
    .splice(0, numSelected);
    blanco = testQuestions.map(i => {
      return i._id;
    });
  }

  if(selected.length > 0){
   let counter = blanco.length
    while(counter < numSelected && list.length > 0 && selected.length > 0){
      let random = selected.sort(function() {
        return 0.5 - Math.random();
      })
      for( i = 0; i < selected.length; i++ ){
        const found = list.find(q => q.tema_id == random[i])

        if(!found){
          const temaIdx = selected.findIndex(elem => elem === random[i])
          selected.splice(temaIdx,1)
        }else{
          if(blanco.length < numSelected){
            blanco.push(found)
            const idx = list.findIndex(q => q._id == found._id)
            list.splice(idx,1)
            counter++
          }
        }
      }
    }
  }

  let respuestas = []
  blanco.forEach( q => {
    respuestas.push({ id: q, answered:false})
  })

  let testCheck = { right: 0, wrong: 0, blank: blanco.length}


  const testBody = {
    user_id: res.locals.reboot_user._id,
    title: testName,
    testCheck: testCheck,
    aciertos: [],
    aciertos_num: 0,
    fallos: [],
    fallos_num: 0,
    respuestas: respuestas,
    nota: false,
    end: false,
    no_contestadas: blanco,
    mostrar_solucion: false,
    selectedTemas: selected,
    mostrar_solucion: correctorSwitch
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

function deleteDesafio(req, res){
  testModel
  .remove({ desafio: true })
  .then(response => res.json(response))
  .catch(err => handdleError(err, res))
}

function handdleError(err, res) {
  return res.status(400).json(err);
}
