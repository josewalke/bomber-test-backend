const UserModel = require('../models/users.model')

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
intervalo2

function handdleError (err, res) {
  return res.status(400).json(err)
}
