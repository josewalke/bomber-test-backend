let config;
const env = process.env.NODE_ENV;
console.log(env)
if (env === 'heroku') {
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
