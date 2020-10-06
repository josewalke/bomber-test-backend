const router = require("express").Router();
const { authenticated, me } = require("../services/auth.service");

const {
  getAllUsers,
  getUserById,
  deleteUserById,
  updateUser,
  getMe,
  new_pass,
  lolo,
  getUserByEmail
} = require("../controlers/users.controller");

router.post('/lolo',lolo);
router.get('/me',  authenticated, getMe);
router.get('/:email',getUserByEmail);
router.post('/new_pass',authenticated, new_pass);
router.get('/:id', getUserById);
router.put('/:id', updateUser);
router.get('/', getAllUsers);
router.delete('/:id', deleteUserById);




module.exports = router;
