const router = require("express").Router();
const { authenticated, me } = require("../services/auth.service");

const {
  crearDatos,
  getAllSuscription,
  updateLocalizacion
} = require("../controlers/localizacion.controller");


router.put('/:id', updateLocalizacion)

router.post('/', crearDatos)

router.get('/', getAllSuscription)

router.get('/:id')

router.delete('/:id')

module.exports = router;