const UserModel = require('../models/users.model')

module.exports = {
  getAllUsers,
  getUserById,
  deleteUserById,
  updateUser
}


//  ?age=20
function getAllUsers(req, res) {
  const age = req.query.age;
  console.log('todos los usuarios')
  UserModel
    .find()
    .then(response => res.json(response))
    .catch((err) => handdleError(err, res))
}
function getSerachUsers(req, res) {
  const age = req.query.age;
  console.log('todos los usuarios')
  UserModel
    .find({ age: { $gte: edad } })
    .then(response => res.json(response))
    .catch((err) => handdleError(err, res))
}

function getUserById (req, res) {
  console.log(req.body)
  console.log("un solo usuario")
  UserModel
    .findById(req.params.id)
    .then(response => res.json(response))
    .catch((err) => handdleError(err, res))
}

function deleteUserById (req, res) {
  UserModel
    .remove({ _id: req.params.id })
    .then(response => res.json(response))
    .catch(err => handdleError(err, res))
}

function updateUser (req, res) {
  UserModel
    .findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    })
    .then(response => res.json(response))
    .catch((err) => handdleError(err, res))
}

function handdleError (err, res) {
  return res.status(400).json(err)
}
