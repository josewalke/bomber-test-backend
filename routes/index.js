const router = require("express").Router();

const authRouter = require("./auth.router");
const usersRouter = require("./users.router");
const testsRouter = require("./tests.router");
const questionsRouter = require("./questions.router");
const messagesRouter = require("./messages.router");
const temarioRouter = require("./tema.router");
const correoRouter = require("./correo.router");
const suscriptionRouter = require("./suscription.router");
const localizacionRouter = require("./localizacion.router");
const paymentStripe = require("./paymentStripe.router");
const url_clase = require("./url_clase.router");

router.use("/auth", authRouter);
router.use("/users", usersRouter);
router.use("/tests", testsRouter);
router.use("/questions", questionsRouter);
router.use("/messages", messagesRouter);
router.use("/temario", temarioRouter);
router.use("/correo", correoRouter);
router.use("/suscription", suscriptionRouter);
router.use("/localizacion", localizacionRouter);
router.use("/paymentStripe", paymentStripe);
router.use("/url_clase",url_clase);

module.exports = router;
