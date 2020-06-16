const router = require("express").Router();
const { authenticated, me } = require("../services/auth.service");

const {
  getAllUsers,
  getUserById,
  deleteUserById,
  updateUser,
  getMe,
  new_pass
} = require("../controlers/users.controller");

router.get('/me',  authenticated, getMe);
router.post('/new_pass',authenticated, new_pass);
router.get('/:id', getUserById);
router.put('/:id', updateUser);
router.get('/', getAllUsers);
router.delete('/:id', deleteUserById);


module.exports = router;
