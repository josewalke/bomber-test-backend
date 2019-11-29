process.stdout.write("\033c");

const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const jwt = require("jsonwebtoken");
const app = express();

// CONFIG AND ENVIRONMENT LOADING FROM .env FILE
let config = require("./.env");
const environment = process.env.NODE_ENV;
config = config[environment];
if (!config) {
  throw new Error(`❌ Invalid ${environment} environment`);
}

// MIDDLEWARES
app.use(cors());
app.use(morgan("combined"));
app.use(express.json());

const UserModel = require("./models/users.model");

const authenticate = (req, res, next) => {
  jwt.verify(req.headers.token, "secret", (err, token) => {
    if (err) {
      res.status(403).json({ error: "Token not valid" });
    }
    UserModel.findOne({ email: token.email }).then(user => {
      res.locals.user = user;
      next();
    });
  });
};

// NONGOOSE
mongoose.connect(
  config.mongoURL + config.mongoDBName,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  err => {
    if (err) {
      throw new Error(err);
    }
    console.info("💾  Mongoose is connected");
  }
);

// ROUTING
const apiRouter = require("./routes");
app.use("/api", apiRouter);

app.get("/api/whoami", authenticate, (req, res) => {
  res.send(`jalou! ${res.locals.user.name}`);
});

// Init server
app.listen(config.port, err => {
  if (err) {
    throw new Error(err);
  }
  console.info("\n\n" + ">".repeat(40));
  console.info(" 💻  Reboot Server Live");
  console.info(` 📡  PORT: http://localhost:${config.port}`);
  console.info(">".repeat(40) + "\n\n");
});
