process.stdout.write("\033c");

const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const jwt = require("jsonwebtoken");
const app = express();


// CONFIG AND ENVIRONMENT LOADING FROM .env FILE
let config = require("./config");
app.all('*', function(req, res, next) {
  var origin = req.get('origin');
  res.header('Access-Control-Allow-Origin', 'http://oposicionbomberos.com');
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});
// MIDDLEWARES
app.use(cors({origin: true}));
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

mongoose.connect(
  config.mongoURL,
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
app.listen(process.env.PORT || config.port, err => {
  if (err) {
    throw new Error(err);
  }
  console.info("\n\n" + ">".repeat(50));
  console.info(" 💻  Bienvenido Jose ");
  console.info(` 📡  Estas conectado al PORT: http://localhost:${config.port}`);
  console.info(">".repeat(50) + "\n\n");
});
