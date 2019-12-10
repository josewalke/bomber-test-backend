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
    lastName: req.body.lastName,
    email: req.body.email,
    password: hashedPwd,
    phone: req.body.phone
  };

  UserModel.create(userBody)
    .then(() => {
      const userData = {
        name: userBody.name,
        lastName: userBody.lastName,
        email: userBody.email,
        password: userBody.password,
        phone: userBody.phone
      };

      const token = jwt.sign(
        userData,
        "secret",
        { expiresIn: "1w" }
      );

      return res.json({ token: token, ...userData });
    })
    .catch(err => {
      res.status(403).json({ error: err });
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

        const userData = { username: user.name, email: user.email, role: user.role, objectId: user._id};

        const token = jwt.sign(
          userData,
          "secret",
          { expiresIn: "1h" }
        );

        return res.json({ token: token, ...userData });
      });
    })
    .catch(err => handdleError(err, res));
}

function handdleError(err, res) {
  return res.status(400).json(err);
}
