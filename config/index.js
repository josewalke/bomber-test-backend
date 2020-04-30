let config;
const heroku = process.env.heroku;
console.log('hola mundooo')

console.log('heroku = ' + heroku)
if (heroku) {
  config = {
    mongoURL: process.env.mongoURL,
    apiKeys: process.env.apiKeys,
    port: process.env.port,
    nodemailer: {
      email: process.env.email,
      password : process.env.password
    }
  };
} else {
  config = require("../.env");

}
module.exports = config;
