const UserModel = require('../models/users.model')
const nodemailer = require('nodemailer')
const respuestaModel = require('../models/respuesta')
const relacion_pregunta_temaModel = require('../models/pregunta_tema')
const questionsModel = require('../models/questions.model')
const temaModel = require('../models/tema.model')
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { find } = require('../models/users.model')

const heroku = process.env.heroku;
let config;
if (heroku) {
  config = process.env
}else {
  config = require("../.env");
}

module.exports = {
  getAllUsers,
  getUserById,
  deleteUserById,
  updateUser,
  getMe,
  new_pass,
  reset_pass,
  getUserByEmail
}

function getAllUsers(req, res) {
  console.log('alluser')
  UserModel
    .find({ $or: [{role:'cliente'},{role:'prueba'}]})
    .then(response => res.json(response))
    .catch((err) => handdleError(err, res))
}

function getUserById (req, res) {
  UserModel
    .findById(req.params.id)
    .then(response => res.json(response))
    .catch((err) => handdleError(err, res))
}
function getUserByEmail (req, res){
  UserModel
  .find({email: req.params.email})
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
  console.log(req.body)
  console.log(req.params.id)
  UserModel
    .findOneAndUpdate({_id:req.params.id}, req.body)
    .then(response => {
      console.log(response)
      res.json(response)})
    .catch((err) => handdleError(err, res))

}

//Poner negativos cada 1min
var intervalo2 = setInterval(negativos, 3600000)
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

// desactivar usuarios cada 1min
var intervalo3 = setInterval(desactivar, 3600000)
// var intervalo3 = setInterval(desactivar, 1000)


function desactivar(req, res){
  UserModel.find({role:'cliente', active:true}).then(usuarios => {
    console.log(usuarios.length)
    for(let i=0;i<usuarios.length; i++){
      let suscription_end_active = parseInt(usuarios[i].suscription_end_active)
      if(suscription_end_active < new Date().getTime()){
        UserModel
        .findByIdAndUpdate({_id: usuarios[i]._id},{active: false})
        .then(response => console.log(response))
      }else{
        console.log('sigue siendo valido ')
      }
    }
  })
}
intervalo3


async function new_pass(req,res){

  const hashedPwd = bcrypt.hashSync(req.body.password, 10)
  let body = {
    password: hashedPwd
  }
  console.log(res.locals.reboot_user )

  UserModel
    .findOneAndUpdate({email: res.locals.reboot_user.email}, body)
    .then(response => res.json('actualizado correctamente'))
    .catch((err) => handdleError(err, res))
}

async function reset_pass(req,res){

  UserModel
  .findOne(req.body)
  .then(response =>{

    const userData = {
      nickName: response.nickName,
      firstName: response.name,
      lastName: response.lastName,
      email: response.email,
      role: response.role,
      userId: response._id,
      phone: response.phone,
      img_url: response.img_url,
      mensajes: response.mensajes,
      MensajesTotales: response.MensajesTotales,
      aprobados: response.aprobados,
      suspendidos: response.suspendidos,
      total: response.total,
      suscription_type: response.suscription_type,
      active: response.active,
      negativos: response.negativos,
      suscription_end_active: response.suscription_end_active,
      active: response.active,
      provincia: response.provincia
    }
    const token = jwt.sign(userData, "secret", { expiresIn: "1w" });

    var transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      service: 'gmail',
      secure:465,
      auth: {
        user: config.email,
        pass: config.password
      }
    })

    const mailOptions = {
      from: config.email, // sender address
      to: response.email, // list of receivers
      subject: 'bomberos', // Subject line
      html: `<p>Para cambiar la contraseña pinche en el link</p>
      <a href="https://oposicionbomberos.com/new_pass/${token}">Cambiar la contraseña</a>
                          ` // plain text body
    }
    transporter.sendMail(mailOptions)
    res.json(response)

  }).catch((err) => handdleError(err, res))
}


function handdleError (err, res) {
  console.log(err)
  //return res.status(400).json(err)
}
