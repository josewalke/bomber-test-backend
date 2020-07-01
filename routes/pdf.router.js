const router = require('express').Router()
const { authenticated, me } = require("../services/auth.service");

const {
save_pdf
} = require('../controlers/pdf.controller')

// router.get("/", enviar);
router.post("/",save_pdf)

module.exports = router