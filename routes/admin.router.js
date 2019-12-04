const router = require("express").Router();
const { authenticated, me } = require("../services/auth.service");

const {
  getAllUsers,
  getUserById,
  deleteUserById,
  updateUser
} = require("../controlers/users.controller");

router.get("/question", authenticated, me);
router.get("/tema", authenticated, me);
router.get("/clientList", authenticated, me);
router.get("/message", authenticated, me);


module.exports = router;
