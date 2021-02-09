const router = require("express").Router();
const { authenticated, me } = require("../services/auth.service");

const {
  createTema,
  getAllTemas,
  updateTema,
  deleteTemaById
} = require("../controlers/temas.controller");


router.get('/', getAllTemas)

router.post('/crear', createTema)

router.put('/:id',updateTema)


router.delete('/:id', deleteTemaById)

module.exports = router;