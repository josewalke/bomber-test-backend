const UserModel = require("../models/users.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  signup,
  login
};

function signup(req, res) {
  const hashedPwd = bcrypt.hashSync(req.body.password, 10);
  const userBody = {
    name: req.body.name,
    nickName: req.body.nickName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: hashedPwd,
    phone: req.body.phone
  };

  UserModel.create(userBody)
    .then(newUser => {
      const userData = {
        nickName:userBody.nickName,
        firstName: userBody.name,
        lastName: userBody.lastName,
        email: userBody.email,
        role: newUser.role,
        userId: newUser._id,
        phone: userBody.phone,
        img_url: newUser.img_url,
        mensajes: newUser.mensajes,
        MensajesTotales: newUser.MensajesTotales,
        aprobados: newUser.aprobados,
        suspendidos: newUser.suspendidos,
        total: newUser.total,
        suscription_type: newUser.suscription_type,
        active: false
      };

      const token = jwt.sign(userData, "secret", { expiresIn: "1w" });

      return res.json({ token: token, ...userData });
    })
    .catch(err => {
      res.json({ error: err });
    });
}


function login(req, res) {
  UserModel.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.json({ error: "wrong email" });
      }

      bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (!result) {
          return res.json({
            error: `wrong password for ${req.body.email}`
          });
        }

        const userData = {
          nickName: user.nickName,
          firstName: user.name,
          lastName: user.lastName,
          email: user.email,
          role: user.role,
          userId: user._id,
          phone: user.phone,
          img_url: user.img_url,
          mensajes: user.mensajes,
          MensajesTotales: user.MensajesTotales,
          aprobados: user.aprobados,
          suspendidos: user.suspendidos,
          total: user.total,
          suscription_type: user.suscription_type,
          active: user.active,
          negativos: user.negativos,
          suscription_end_active: user.suscription_end_active
        };

        const token = jwt.sign(userData, "secret", { expiresIn: "1w" });

        return res.json({ token: token, ...userData });
      });
    })
    .catch(err => handdleError(err, res));
}

function handdleError(err, res) {
  return res.status(400).json(err);
}
