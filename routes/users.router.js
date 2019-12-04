const router = require("express").Router();
const { authenticated, me } = require("../services/auth.service");

const {
  getAllUsers,
  getUserById,
  deleteUserById,
  updateUser
} = require("../controlers/users.controller");

router.get("/newTest", authenticated, me);
router.get("/testList", authenticated, me);
router.get("/message", authenticated, me);
router.get("/exam", authenticated, me);
router.get("/test", authenticated, me);
router.put("/profile", authenticated, me);

module.exports = router;
