const UserModel = require('../models/users.model')

module.exports = {
  // createTest
}

// function createTest(req, res) {

//   const testBody = {
//     : req.body.pregunta,
//     lastName: req.body.,
//     email: req.body.email,
//     password: hashedPwd,
//     phone: req.body.phone
//   };

//   UserModel.create(userBody)
//     .then(() => {
//       const userData = {
//         username: req.body.user_name,
//         email: req.body.user_email
//       };

//       const token = jwt.sign(
//         userData,
//         "secret",
//         { expiresIn: "1w" }
//       );

//       return res.json({ token: token, ...userData });
//     })
//     .catch(err => {
//       res.status(403).json({ error: err });
//     });
// }