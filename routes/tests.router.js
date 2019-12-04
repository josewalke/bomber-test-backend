const router = require("express").Router();
const { authenticated, me } = require("../services/auth.service");

const {
  getAllUsers,
  getUserById,
  deleteUserById,
  updateUser
} = require("../controlers/tests.controller");


router.post('/')

router.put('/:id')

router.get('/:id')

router.get('/')

router.delete('/:id')

module.exports = router;