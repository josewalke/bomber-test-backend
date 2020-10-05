const router = require('express').Router()
const { authenticated, me } = require("../services/auth.service");

const {
  enviar,
  reset_pass,
  lolo
} = require('../controlers/correo.controller')

router.get("/", enviar);
router.post("/find",reset_pass)
router.post("/lolo", lolo)

module.exports = router