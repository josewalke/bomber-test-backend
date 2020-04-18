const UserModel = require('../models/users.model')

const respuestaModel = require('../models/respuesta')
const relacion_pregunta_temaModel = require('../models/pregunta_tema')
const questionsModel = require('../models/questions.model')
const temaModel = require('../models/tema.model')

module.exports = {
  getAllUsers,
  getUserById,
  deleteUserById,
  updateUser,
  getMe
}

function getAllUsers(req, res) {
  UserModel
    .find({role: 'cliente'})
    .then(response => res.json(response))
    .catch((err) => handdleError(err, res))
}

function getUserById (req, res) {

  UserModel
    .findById(req.params.id)
    .then(response => res.json(response))
    .catch((err) => handdleError(err, res))
}

function getMe (req, res) {
  console.log(res.locals.reboot_user)
  return res.json(res.locals.reboot_user)
}

function deleteUserById (req, res) {
  UserModel
    .remove({ _id: req.params.id })
    .then(response => res.json(response))
    .catch(err => handdleError(err, res))
}

function updateUser (req, res) {
  UserModel
    .findByIdAndUpdate(req.params.id, req.body)
    .then(response => res.json('actualizado correctamente'))
    .catch((err) => handdleError(err, res))

}

//Poner negativos 1 vez al dia
var intervalo2 = setInterval(negativos, 86400000)
// var intervalo2 = setInterval(negativos, 1000)

function negativos(req, res){
  UserModel
    .find({role: 'cliente'})
    .then(usuarios => {
      for(let i=0;i<usuarios.length; i++){
        if(usuarios[i].inactividad + 86400000 < new Date().getTime()){
          const body = {
            inactividad: new Date().getTime(),
            negativos: usuarios[i].negativos - 10
          }
          UserModel
          .findByIdAndUpdate(usuarios[i]._id, body)
          .then(response => console.log(true))
          .catch((err) => handdleError(err, res))
        }
      }
    })
    .catch((err) => handdleError(err, res))
}
intervalo2

// desactivar usuarios 1 vez al dia
var intervalo3 = setInterval(desactivar, 86400000)


function desactivar(req, res){
  UserModel
    .find({role: 'cliente', active: true})
    .then(usuarios => {
      for(let i=0;i<usuarios.length; i++){

        let suscription_end_active = parseInt(usuarios[i].suscription_end_active)

        if(suscription_end_active > new Date().getTime()){
          UserModel
          .findByIdAndUpdate({_id: usuarios[0]._id},{active: false})
          .then(response => console.log(response))
        }
      }
    })
    .catch((err) => handdleError(err, res))
}
intervalo3


// var intervalo4 = setInterval(prueba, 2000)
 function prueba(req,res){
    let body = {
    enunciado: '',
    imagen_url: '',
    answers: '',
    tema_id: '',
    difficulty: '',
    explicacion: '',
    category: ''
  }
  questionsModel
  .find()
  .then(questions => {

    console.log('la pregunta')
    console.log(questions[0])

    body.enunciado = questions[0].pregunta
    // console.log(body)

    relacion_pregunta_temaModel
    .find({id_pregunta: questions[0].id_pregunta})
    .then(relacion => {
      console.log('===============================')
      console.log('relacion pregunta tema')
      console.log(relacion[0])
      if(relacion[0]){
        temaModel
          .find({id_tema: relacion[0].id_tema})
          .then(tema => {
            console.log('=============================')
            console.log(tema[0])
            if(tema[0]){
              body.tema_id = tema[0]._id
              // console.log(body)

              respuestaModel
              .find({id_pregunta: parseInt(questions[0].id_pregunta)})
              .then(respuesta =>{
                console.log('============================')
                console.log(respuesta)

                if(!respuesta[0] || respuesta.length < 4){
                  console.log('no hay nada')
                  questionsModel
                  .deleteOne({ _id: questions[0]._id })
                  .then(response => res.json('borrado'))
                  .catch(err => handdleError(err, res))
                }else{
                  let newrespuesta = [
                    {
                      respuesta: respuesta[0].respuesta,
                      correcta: ''
                    },
                    {
                      respuesta: respuesta[1].respuesta,
                      correcta: ''
                    },
                    {
                    respuesta: respuesta[2].respuesta,
                    correcta: ''
                  },
                  {
                    respuesta: respuesta[3].respuesta,
                    correcta: ''
                  }]
                  if(tema[0].category === ''){
                    body.category = 'No tiene categoria'
                  }else{
                    body.category = tema[0].category
                  }
                  if(respuesta[0].correcta === 1){
                    newrespuesta[0].correcta = true
                  }else{
                    newrespuesta[0].correcta = false
                  }
                  if(respuesta[1].correcta === 1){
                    newrespuesta[1].correcta = true
                  }
                  else{
                    newrespuesta[1].correcta = false
                  }
                  if(respuesta[2].correcta === 1){
                    newrespuesta[2].correcta = true
                  }
                  else{
                    newrespuesta[2].correcta = false
                  }
                  if(respuesta[3].correcta === 1){
                    newrespuesta[3].correcta = true
                  }
                  else{
                    newrespuesta[3].correcta = false
                  }
                  body.answers = newrespuesta
                  console.log(body)
                  questionsModel
                    .create(body)
                    .then(response => {
                      console.log('subido')
                      questionsModel
                        .deleteOne({ _id: questions[0]._id })
                        .then(response => console.log('borrado'))
                    })
                }
              })
            }else{
              questionsModel
                .deleteOne({_id: questions[0]._id})
                .then(response =>{
                  res.json('borrado porque no tiene tema')
                })
            }
          })
        }else{
          questionsModel
                .deleteOne({ _id: questions[0]._id })
                .then(response => res.json('borrado porque no se relaciona con nada'))
                .catch(err => handdleError(err, res))
        }
    })

  })
 }

// intervalo4
// var intervalo5 = setTimeout(borrado, 1000)

// function borrado (req,res){
//   questionsModel.remove({correcta: 0})
//   .then(questions => {
//     console.log(questions)
//   })
// }
// intervalo5

function handdleError (err, res) {
  return res.status(400).json(err)
}
