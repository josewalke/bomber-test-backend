const router = require("express").Router();
const { authenticated, me } = require("../services/auth.service");

const {
  // createTest,
  getAllTests,
  getTestById,
  createRandomTest
} = require("../controlers/tests.controller");


// router.post('/', createTest)
router.post('/', createRandomTest)

router.put('/:id')

router.get('/:id', getTestById)

router.get('/', getAllTests)

router.delete('/:id')

module.exports = router;