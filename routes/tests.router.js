const router = require("express").Router();
const { authenticated, me } = require("../services/auth.service");

const {
  createTest,
} = require("../controlers/tests.controller");


router.post('/', createTest)

router.put('/:id')

router.get('/:id')

router.get('/')

router.delete('/:id')

module.exports = router;