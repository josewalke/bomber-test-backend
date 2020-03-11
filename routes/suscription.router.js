const router = require("express").Router();
const { authenticated, me } = require("../services/auth.service");

const {
  crearSuscription,
  getAllSuscription,
  updateSuscription
} = require("../controlers/suscription.controller");


router.put('/:id',updateSuscription)

router.post('/',crearSuscription)

router.get('/',getAllSuscription)

router.get('/:id')

router.delete('/:id')

module.exports = router;