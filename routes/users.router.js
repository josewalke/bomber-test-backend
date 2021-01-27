const router = require("express").Router();
const { authenticated, me } = require("../services/auth.service");

const {
  getAllUsers,
  getUserById,
  deleteUserById,
  updateUser,
  getMe,
  new_pass,
  reset_pass,
  getUserByEmail
} = require("../controlers/users.controller");

router.get('/email/:email',getUserByEmail);

router.get('/:id', getUserById);


router.put('/:id', updateUser);

router.post('/reset_pass',reset_pass);

router.get('/me',  authenticated, getMe);

router.post('/new_pass',authenticated, new_pass);

router.get('/', getAllUsers);

router.delete('/:id', deleteUserById);




module.exports = router;
