const router = require('express').Router()
const { authenticated, me } = require("../services/auth.service");

const {
  enviar,
  reset_pass,
  lolo
} = require('../controlers/correo.controller')

router.get("/", enviar);
router.get("/lolo", lolo)
router.post("/find",reset_pass)

module.exports = router