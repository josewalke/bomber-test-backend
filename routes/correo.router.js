const router = require('express').Router()
const { authenticated, me } = require("../services/auth.service");

const {
  enviar
} = require('../controlers/correo.controller')

router.get("/", enviar);

module.exports = router