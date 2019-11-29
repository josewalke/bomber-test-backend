let config;
const heroku = process.env.heroku;
if (heroku) {
  config = {
    mongoURL: process.env.mongoURL,
    apiKeys: process.env.apiKeys,
    port: process.env.port
  };
} else {
  config = require("./../.env");
  const environment = process.env.NODE_ENV;
  config = config[environment];
}
module.exports = config