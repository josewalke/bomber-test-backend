const nodemailer = require('nodemailer')
const messageModel = require('../models/messages.model')
const UserModel = require('../models/users.model')
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
module.exports = {
  enviar,
  reset_pass,
  lolo
};

const heroku = process.env.heroku;
let config;
if (heroku) {
  config = process.env
}else {
  config = require("../.env");

}

  var intervalo = setInterval(email, 3600000)
  function email(req, res) {
    var fecha = new Date()
    var hora = fecha.getHours()
    if(hora === 20){
      UserModel
      .find({role: 'cliente'})
      .then(usuario => {
        for(let i=0; i<usuario.length;i++){
          messageModel
          .find({user_id: usuario[i]._id})
          .then(mensaje => {
            let contador = 0
            for(let x=0;x<mensaje.length;x++){
              if(mensaje[x].respuesta_leida){
                if(mensaje[x].verificado === false){
                  contador++
                }
              }
            }
            if(contador > 0){
              enviar(contador,usuario[i].email)
            }
          })
          .catch(err => handdleError(err, res));
        }
      })
      .catch((err) => handdleError(err, res))
    }
  }
   intervalo

function enviar(contador,email){

  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: config.email,
      pass: config.password
    }
  })
  const mailOptions = {
    from: config.email, // sender address
    to: email, // list of receivers
    subject: 'bomberos', // Subject line
    html: `<p>Holaa</p>
    <h1>Tienes ${contador} mensajes nuevos</h1>
                        ` // plain text body
  }
  transporter.sendMail(mailOptions, function (err, info) {
    if (err) { console.log(err) } else { console.log(info) }
    res.json(response + 1)
  })
  // res.json('enviado')
}

async function reset_pass(req,res){
  console.log(req.body)
  UserModel
    .find(req.body)
    .then(response =>{
      const userData = {
        nickName: response[0].nickName,
        firstName: response[0].name,
        lastName: response[0].lastName,
        email: response[0].email,
        role: response[0].role,
        userId: response[0]._id,
        phone: response[0].phone,
        img_url: response[0].img_url,
        mensajes: response[0].mensajes,
        MensajesTotales: response[0].MensajesTotales,
        aprobados: response[0].aprobados,
        suspendidos: response[0].suspendidos,
        total: response[0].total,
        suscription_type: response[0].suscription_type,
        active: response[0].active,
        negativos: response[0].negativos,
        suscription_end_active: response[0].suscription_end_active,
        active: response[0].active,
        provincia: response[0].provincia
      }
      const token = jwt.sign(userData, "secret", { expiresIn: "1w" });

      var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: config.email,
          pass: config.password
        }
      })
      const mailOptions = {
        from: config.email, // sender address
        to: req.body.email, // list of receivers
        subject: 'bomberos', // Subject line
        html: `<p>Para cambiar la contraseña pinche en el link</p>
        <a href="http://localhost:3000/new_pass/${token}">Cambiar la contraseña</a>
                            ` // plain text body
      }
      transporter.sendMail(mailOptions)

      res.json(response[0]._id)
      }
    )
    .catch((err) => handdleError(err, res))
}

async function lolo(req,res){
  console.log('holaaaaaa')
  res.json(req.body)
}


function handdleError(err, res) {
  return res.status(400).json(err)
}