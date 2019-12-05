const router = require("express").Router();
const { authenticated, me } = require("../services/auth.service");

const {
  getAllUsers,
  getUserById,
  deleteUserById,
  updateUser
} = require("../controlers/users.controller");

router.get('/:id', getUserById);
router.put('/:id', updateUser);
router.get('/', getAllUsers);
// router.get('/search', getSearchUsers);
router.delete('/:id', getAllUsers);
// router.delete('/', getAllUsers);

module.exports = router;
