const testModel = require("../models/test.model");
const questionsModel = require("../models/questions.model");

module.exports = {
  getAllTests,
  getTestById,
  createRandomTest,
  getMyTests,
  createConfigTest,
  updateTest,
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

function updateTest(req, res) {
  testModel
  .findByIdAndUpdate(req.params.id, req.body)
  .then(response => res.json("actualizado correctamente"))
  .catch(err => handdleError(err, res));
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
    title: "Test creado el " + date,
    testCheck: testCheck,
    aciertos: [],
    aciertos_num: 0,
    fallos: [],
    fallos_num: 0,
    respuestas: respuestas,
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

  // if(selected.length > 0){
  //  let counter = blanco.length
  //   while(counter < numSelected && list.length > 0 && selected.length > 0){
  //     let random = selected.sort(function() {
  //       return 0.5 - Math.random();
  //     })
  //     for( i = 0; i < selected.length; i++ ){
  //       const found = list.find(q => q.tema_id == random[i])

  //       if(!found){
  //         const temaIdx = selected.findIndex(elem => elem === random[i])
  //         selected.splice(temaIdx,1)
  //         counter++
  //       }else{
  //         blanco.push(found)
  //         const idx = list.findIndex(q => q._id == found._id)
  //         list.splice(idx,1)
  //         counter++
  //       }
  //     }
  //   }
  // }
  if(list.length > 0 && selected.length > 0){
    while(blanco.length < numSelected){
      let random = selected.sort(function() {
        return 0.5 - Math.random();
      })
      for(let i = numSelected; i > 0; i--){
          const found = list.find(q => q.tema_id == random[i])
          if(found){
            blanco.push(found)
            const idx = list.findIndex(q => q._id == found._id)
            list.splice(idx,1)
          }else{
            const temaIdx = selected.findIndex(elem => elem === random[i])
            list.splice(idx,1)
          }
        }
      }


  // if(selected.length > 0){
  //   let random = selected.sort(function() {
  //     return 0.5 - Math.random();
  //   })

  //   if(selected.length > numSelected){
  //     while(blanco.length < numSelected){
  //       for(let i = numSelected; i > 0; i--){
  //         const found = list.find(q => q.tema_id == random[i])
  //         blanco.push(found)
  //       }
  //     }
  //   }
    // if(selected.length = numSelected){
    //   while(blanco.length < numSelected){
    //     random.forEach(tema => {
    //       const found = list.find(q => q.tema_id == tema)
    //       blanco.push(found)
    //     })
    //   }
    // }
    // if(selected.length < numSelected){
    //   console.log('mas preguntas')
    //   while(blanc.length < numSelected){

    //   }
    // }



    console.log(blanco)
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
    nota: 0,
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
