const router = require("express").Router();
const { authenticated, me } = require("../services/auth.service");

const {
  crearSuscription,
  getAllSuscription
} = require("../controlers/suscription.controller");


router.post('/',crearSuscription)

router.get('/',getAllSuscription)

router.put('/:id')

router.get('/:id')

router.delete('/:id')

module.exports = router;