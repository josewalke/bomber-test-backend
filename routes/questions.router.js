const router = require("express").Router();
const { authenticated, me } = require("../services/auth.service");

const {
  getAllUsers,
  getUserById,
  deleteUserById,
  updateUser
} = require("@/controlers/questions.controller");


router.post('/')

router.get('/')

router.put('/:id')

router.get('/:id')

router.delete('/:id')

module.exports = router;