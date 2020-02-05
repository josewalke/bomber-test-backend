const router = require('express').Router()
const { authenticated, me } = require("../services/auth.service");

const {
  prueba
} = require('../controlers/correo.controller')

router.get("/", prueba);

module.exports = router