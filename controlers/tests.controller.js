const testModel = require("../models/test.model");
const questionsModel = require("../models/questions.model");
const temaModel = require('../models/tema.model');
const userModel = require("../models/users.model");
const { response } = require("express");

module.exports = {
  getAllTests,
  getTestById,
  createRandomTest,
  getMyTests,
  createConfigTest,
  testAnswer,
  postExam,
  deleteDesafio,
  testPremium,
  updateDeberes,
  updateNota,
  reload,
  prueba

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
  // console.log(req.params)
  testModel
    .findById(req.params.id)
    .then(async response => {
      const populado = await response.populate("no_contestadas").execPopulate();
      // console.log(populado)
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
  console.log(req.body.time_end)
  console.log("😱😱")
  if(req.body.time_end){
    testModel
      .findByIdAndUpdate(req.params.id, req.body)
      .then(response => res.json("actualizado correctamente"))
      .catch(err => handdleError(err, res));

  }else{
    console.log(req.body)
    let num = req.body.numero
    let resp = req.body.respuesta
    let guess = resp.guess
    console.log('guess =========')
    console.log(guess)

    testModel
    .findById(req.params.id).then(test =>{
      let check = test.testCheck
      let newCheck = {right: check.right, wrong: check.wrong, blank: check.blank}
      // guess === true ? newCheck.right++ : newCheck.wrong++
      // newCheck.blank--
      if(guess === true){
        newCheck.right++
        newCheck.blank -=1
      }else{
        newCheck.wrong++
        newCheck.blank -=1
      }
      console.log('NEWCHECK====')
      console.log(newCheck)
      test.testCheck = newCheck
      test.respuestas.set(num, resp)
      // test.no_contestadas.length - (num + 1)
      test.save().then(response => res.json())
    })
    .catch(err => console.log(err))
  }
}
// async function lolo(test){
//   console.log('CONTADOR======')
//   // console.log(test.respuestas.length)
//   for(let i = 0; i < test.respuestas.length ;i++){
//     // console.log(test.respuestas[i].respuestas.length)
//     if(test.respuestas[i].respuestas[0] === undefined){
//       console.log(true)
//     }
//   }
// }

async function createRandomTest(req, res) {
  const now =  new Date()
  const day = now.getDate() > 9 ? now.getDate() : "0" + now.getDate()
  const  month = now.getMonth() > 9 ? now.getMonth() : "0" + (now.getMonth()+1)
  const minutes = now.getMinutes() > 9 ? now.getMinutes() : "0" + now.getMinutes()
  // let date = now.getDate() +"/"+ now.getMonth()+1 +"/"+ now.getFullYear() + " - " + now.getHours()+ ":" + minutes
  let date = day +"/"+ month +"/"+ now.getFullYear() + " - " + now.getHours()+ ":" + minutes
  let num = 45;
  var list = [];
  let blanco = [];
  let ST = await temaModel.find({name: {$eq:'Sin Tema'}})
  //codigo antiguo de para sacar preguntas
  // list = await questionsModel.find(
  //   { $or: [{tema_id: {$not: {$eq: ST[0]}}},
  //           {tema_id: {$not: {$eq: ST[1]}}},
  //           {tema_id: {$not: {$eq: ST[2]}}},
  //           {tema_id: {$not: {$eq: ST[3]}}},
  //         ]
  //   }
  // )

  //Sacar preguntas para que esten permitidas
  let TV = await temaModel.find({visible: {$eq:true}})
  TV = TV.map(x =>{
    return x._id
  })
  for(let i=0;i<TV.length;i++){
    var buscador = await questionsModel.find({tema_id: {$eq: TV[i]}})
    for(let x=0; x<buscador.length;x++){
      list.push(buscador[x]._id)
    }
  }

  var testQuestions=[]
  var posicion=[]
  var seleccionado = ''
  for(let i=0;i<num;i++){
    seleccionado = parseInt( Math.random() * (list.length - 0) + 0)
    if(!posicion.includes(seleccionado)){
      posicion.push(seleccionado)
      testQuestions.push(list[seleccionado])
    } else {
      i--
    }
  }

  // var testQuestions = list
  //   .sort(function() {
  //     return 0.5 - Math.random();
  //   })
  //   .splice(0, num);
  blanco = testQuestions.map(i => {
    return i._id;
  });

  let respuestas = []
  blanco.forEach( q => {
    respuestas.push({ id: q, answered:false})
  })

  let testCheck = { right: 0, wrong: 0, blank: blanco.length}
  console.log('preparando examen aleatorio')
  const testBody = {
    user_id: res.locals.reboot_user._id,
    title: "A - " + date,
    testCheck: testCheck,
    aciertos: [],
    aciertos_num: 0,
    fallos: [],
    fallos_num: 0,
    respuestas: respuestas,
    nota: false,
    end: false,
    no_contestadas: blanco,
    mostrar_solucion: true,
    desafio: false,
    deberes: false
  };
  console.log('enviando examen aleatorio')
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
  let ST = await temaModel.find({name: {$eq:'Sin Tema'}})
  list = await questionsModel.find(
    { $or: [{tema_id: {$not: {$eq: ST[0]}}},
            {tema_id: {$not: {$eq: ST[1]}}},
            {tema_id: {$not: {$eq: ST[2]}}},
            {tema_id: {$not: {$eq: ST[3]}}},
          ]
    }
  );

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
    var testQuestions = list
    .sort(function() {
      return 0.5 - Math.random();
    })
   let counter = blanco.length
    while(counter < numSelected && testQuestions.length > 0 && selected.length > 0){
      let random = selected.sort(function() {
        return 0.5 - Math.random();
      })
      for( i = 0; i < selected.length; i++ ){
        const found = testQuestions.find(q => q.tema_id == random[i])

        if(!found){
          const temaIdx = selected.findIndex(elem => elem === random[i])
          selected.splice(temaIdx,1)
        }else{
          if(blanco.length < numSelected){
            blanco.push(found)
            const idx = testQuestions.findIndex(q => q._id == found._id)
            testQuestions.splice(idx,1)
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
    mostrar_solucion: correctorSwitch,
    desafio:false,
    deberes: false
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

var falseD = setInterval(falseDesafio, 1000)
async function falseDesafio(req,res){
  var hoy = new Date
  if(hoy.getDay() === 6){
      testModel.find({visible: true})
      .then(response =>{
        for(let i = 0; i < response.length;i++){
          testModel.findByIdAndUpdate(response[i]._id,{visible:false})
          .then(response => {response.data})
        }
      })
    }

}
falseD

// async function createConfigTest(req, res) {
//   const testName = req.body.name
//   const numSelected = req.body.number
//   const selected = req.body.temas
//   const correctorSwitch  = req.body.correction
//   let list = []
//   let blanco = []
//   let no_contestadas = []
//   var respuestas = []
//   for (i=0;i<numSelected;i++){
//     // console.log(selected[i])
//     var numero = Math.floor(Math.random() * (selected.length ) )

//     list = await questionsModel.find({tema_id: selected[numero]})

//     var lolo = Math.floor(Math.random() * (list.length - 1) )
//     if(!blanco.includes(lolo)){
//       blanco.push(lolo)
//       no_contestadas.push(list[lolo]._id)
//       respuestas.push({id: list[lolo]._id, answered: false})
//     }else{
//       i--
//     }
//     // console.log('pregunta '+lolo+' tema '+numero)
//     // console.log(numero)
//   }
//   let testCheck = { right: 0, wrong: 0, blank: blanco.length}

//   const testBody = {
//     user_id: res.locals.reboot_user._id,
//     title: testName,
//     testCheck: testCheck,
//     aciertos: [],
//     aciertos_num: 0,
//     fallos: [],
//     fallos_num: 0,
//     respuestas: respuestas,
//     nota: false,
//     end: false,
//     no_contestadas: blanco,
//     mostrar_solucion: false,
//     selectedTemas: selected,
//     mostrar_solucion: correctorSwitch,
//     deberes: true,
//     desafio:false,
//     deberes: false
//   };

//   // console.log(no_contestadas)
//   // console.log(respuestas)
//   console.log(testBody)

//   testModel
//     .create(testBody)
//     .then(async response => {
//       const populado = await response.populate("no_contestadas").execPopulate();
//       res.json(populado);
//     })
//     .catch(err => {
//       res.status(403).json({ error: err });
//     });

// }

function getMyTests(req, res) {
  console.log('buscar test')
  testModel
    .find({ user_id: req.params.id })
    .then(response => res.json(response))
    .catch(err => handdleError(err, res));
}

function deleteDesafio(req, res){
  console.log('borrar desafio')
  testModel
  .remove({ desafio: true })
  .then(response => res.json(response))
  .catch(err => handdleError(err, res))
}

async function testPremium(req, res){
  const now =  new Date()
  const day = now.getDate() > 9 ? now.getDate() : "0" + now.getDate()
  const  month = now.getMonth() > 9 ? now.getMonth() : "0" + now.getMonth()
  const minutes = now.getMinutes() > 9 ? now.getMinutes() : "0" + now.getMinutes()
  // let date = now.getDate() +"/"+ now.getMonth()+1 +"/"+ now.getFullYear() + " - " + now.getHours()+ ":" + minutes
  let date = day +"/"+ month +"/"+ now.getFullYear() + " - " + now.getHours()+ ":" + minutes
  let num = 45;
  var list = [];
  let blanco = [];

  let TV = await temaModel.find({visible: {$eq:true}})
  TV = TV.map(x =>{
    return x._id
  })
  for(let i=0;i<TV.length;i++){
    var buscador = await questionsModel.find({tema_id: {$eq: TV[i]}})
    for(let x=0; x<buscador.length;x++){
      list.push(buscador[x]._id)
    }
  }

  var testQuestions=[]
  var posicion=[]
  var seleccionado = ''
  for(let i=0;i<num;i++){
    seleccionado = parseInt( Math.random() * (list.length - 0) + 0)
    if(!posicion.includes(seleccionado)){
      posicion.push(seleccionado)
      testQuestions.push(list[seleccionado])
    } else {
      i--
    }
  }

  // var testQuestions = list
  //   .sort(function() {
  //     return 0.5 - Math.random();
  //   })
  //   .splice(0, num);
  blanco = testQuestions.map(i => {
    return i._id;
  });

  let respuestas = []
  blanco.forEach( q => {
    respuestas.push({ id: q, answered:false})
  })

  let testCheck = { right: 0, wrong: 0, blank: blanco.length}

  const testBody = {
    user_id: '',
    title: "Examen del profesor - " + date,
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
    desafio: false,
    deberes: true
  };
   res.json(testBody)
}

async function updateDeberes(req,res){
  console.log(req.body)
  testModel
    .findByIdAndUpdate(req.params.id, req.body)
    .then(response => res.json('actualizado correctamente'))
    .catch((err) => handdleError(err, res))
}
async function updateNota(req,res){
  testModel
    .findByIdAndUpdate(req.params.id, req.body)
    .then(response => res.json('actualizado correctamente'))
    .catch((err) => handdleError(err, res))
}
async function reload(req,res){
  testModel
    .findByIdAndUpdate(req.params.id, req.body)
    .then(response => res.json('actualizado correctamente'))
    .catch((err) => handdleError(err, res))
}

async function prueba(req,res){
  console.log('HOLAAAAAAAAAAAAA')
  testModel
    .findById(req.params.id)
    .then(async response => {
      // const populado = await response.populate("no_contestadas").execPopulate();
      console.log(response.testCheck)
      res.json(response);
    })
    .catch(err => handdleError(err, res));
}

function handdleError(err, res) {
  return res.status(400).json(err);
}
