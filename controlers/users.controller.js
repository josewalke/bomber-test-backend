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


// var intervalo5 = setTimeout(borrar, 1000)


// async function borrar(req, res){
// }
// intervalo5
// let ST = await temaModel.find({name: {$eq:'Sin Tema'}})
// // let NT = await temaModel.find({visible: {$eq:false}})
// let NT = await temaModel.find({visible: {$eq:true}})
// NT = NT.map(x =>{
//   return x._id
// })
// list = await questionsModel.find(
//   { $or: [{tema_id: {$not: {$eq: ST[0]}}},
//           {tema_id: {$not: {$eq: ST[1]}}},
//           {tema_id: {$not: {$eq: ST[2]}}},
//           {tema_id: {$not: {$eq: ST[3]}}},

//         ]
//   })
//   var lista = []
//   for(let i=0;i<NT.length;i++){
//     var buscador = await questionsModel.find({tema_id: {$eq: NT[0]}})
//     for(let x=0; x<buscador.length;x++){
//       lista.push(buscador[x]._id)
//     }
//   }
//   console.log(lista)
//   // console.log(list[0].tema_id)
//   // console.log(conter)
//   // console.log(ST.length)
//   //  console.log(NT)
// {tema_id: ObjectId('5e960abf6864168302fc21ec')}
// temaModel
// .find()
// .then(response =>{
//   console.log(response[0])

//   var body = {
//     visible: false
//   }
//   for(let i=0;i<response.length;i++){
//     temaModel
//       .findByIdAndUpdate({_id: response[i]._id}, body)
//       .then(response => res.json('actualizado correctamente'))
//       .catch((err) => handdleError(err, res))

//   }
// })
// temaModel
// .find()
// .then(response => {
//   for(let i=0;i<response.length;i++){
//     questionsModel
//     .find({tema_id: response[i]._id})
//     .then(pregunta => {
//       // console.log(pregunta.length)
//       if(pregunta.length === 0){
//         temaModel
//         .remove({ _id: response[i]._id })
//         .then(borrado => res.json(borrado))
//         .catch(err => handdleError(err, res))
//       }else {
//         console.log(false)
//       }

//     })
//   }
// })


function handdleError (err, res) {
  return res.status(400).json(err)
}
