const router = require("express").Router();
const { authenticated, me } = require("../services/auth.service");

const {
  createTema,
  getAllTemas,
  getTemaById,
  updateTema
} = require("../controlers/tema.controller");


router.post('/', createTema)

router.put('/:id')

router.get('/:id')

router.get('/', getAllTemas)

router.delete('/:id')

module.exports = router;