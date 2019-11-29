const router = require("express").Router();

const authRouter = require("./auth.router");
const usersRouter = require("./users.router");

router.use("/auth", authRouter);
router.use("/users", usersRouter);

module.exports = router;
