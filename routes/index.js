const router = require("express").Router();

const authRouter = require("./auth.router");
const usersRouter = require("./users.router");
const testsRouter = require("./tests.router");
const questionsRouter = require("./questions.router");
const messagesRouter = require("./messages.router");

router.use("/auth", authRouter);
router.use("/users", usersRouter);
router.use("/tests", testsRouter);
router.use("/questions", questionsRouter);
router.use("/messages", messagesRouter);
module.exports = router;
