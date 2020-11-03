const router = require('express').Router()
const { authenticated, me } = require("../services/auth.service");

const {
save_pdf,
buscar
} = require('../controlers/pdf.controller')

router.post("/",save_pdf)
router.post("/find", buscar);

module.exports = router