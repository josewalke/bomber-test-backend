const router = require("express").Router();
const { authenticated, me } = require("../services/auth.service");

const {
  updateUser2,
  getAllUsers,
  getUserById,
  deleteUserById,
  getMe,
  new_pass,
  reset_pass,
  getUserByEmail
} = require("../controlers/users.controller");

router.put('/:id', updateUser2);
router.get('/email/:email',getUserByEmail);
router.get('/:id', getUserById);
router.post('/reset_pass',reset_pass);
router.get('/me',  authenticated, getMe);
router.post('/new_pass',authenticated, new_pass);
router.get('/', getAllUsers);
router.delete('/:id', deleteUserById);




module.exports = router;
