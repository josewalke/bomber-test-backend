const nodemailer = require('nodemailer')
const messageModel = require('../models/messages.model')
const UserModel = require('../models/users.model')
module.exports = {
  prueba
};
let config = require('../.env')

  var intervalo = setInterval(alternarColor, 3600000)
  function alternarColor(req, res) {
    var fecha = new Date()
    var hora = fecha.getHours()
    if(hora === 19){
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
                if(!mensaje[x].verificado){
                  contador++
                }
              }
            }
            if(contador > 0){
              prueba(contador,usuario[i].email)
            }
          })
          .catch(err => handdleError(err, res));
        }
      })
      .catch((err) => handdleError(err, res))
    }
  }
   intervalo

function prueba(contador,email){

  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: config.nodemailer.email,
      pass: config.nodemailer.password
    }
  })
  const mailOptions = {
    from: 'worktrabajo47@gmail.com', // sender address
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

function handdleError(err, res) {
  return res.status(400).json(err)
}