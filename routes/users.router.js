const router = require("express").Router();
const { authenticated, me } = require("../services/auth.service");

const {
  getAllUsers,
  getUserById,
  deleteUserById,
  updateUser
} = require("../controlers/users.controller");

// POST : 'LOCALHOST:2222/api/users'
router.get('/:id')
// GET : 'LOCALHOST:2222/api/users'
router.put('/:id')
// GET : 'LOCALHOST:2222/api/users/id'

// PUT : 'LOCALHOST:2222/api/users/id'
// DELETE : 'LOCALHOST:2222/api/users/id'

// POST : 'LOCALHOST:2222/api/users'  Esta esta ok  "indica que quieres crear un user "
// POST : 'LOCALHOST:2222/api/users/id/tweets' Esta esta mala porque tu no sabes el id del usuario que se va crear
// POST : 'LOCALHOST:2222/api/tweets'


// GET : 'LOCALHOST:2222/api/users/id/tweets' Esta esta mala porque tu no sabes el id del usuario que se va crear
// GET : 'LOCALHOST:2222/api/tweets?userID=asiuodhjaiodasd'

router.get('/', getAllUsers);
router.delete('/:id', authenticated, me,  getAllUsers);
router.get('/',  getAllUsers);
router.delete('/', getAllUsers);

module.exports = router;


// router.get('tests/:id', authentificated, createdByMe, getUserById);  // GET : 'LOCALHOST:2222/api/users/fico'