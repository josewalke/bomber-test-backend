const router = require('express').Router()
const { authenticated, me } = require("../services/auth.service");

const {
save_pdf,
buscar,
delete_pdf
} = require('../controlers/pdf.controller')

router.post("/",save_pdf)
router.post("/find", buscar);
router.delete("/:id",delete_pdf);


module.exports = router