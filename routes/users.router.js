const router = require("express").Router();
const { authenticated, me } = require("../services/auth.service");

const {
  getAllUsers,
  getUserById,
  deleteUserById,
  updateUser,
  getMe
} = require("../controlers/users.controller");

router.get('/me',  authenticated, getMe);
router.get('/:id', getUserById);
router.put('/:id', updateUser);
router.get('/', getAllUsers);
router.delete('/:id', getAllUsers);
// router.get('/search', getSearchUsers);
// router.delete('/', getAllUsers);

module.exports = router;
