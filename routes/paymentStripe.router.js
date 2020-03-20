const router = require("express").Router();
const { authenticated, me } = require("../services/auth.service");

const {
basic,
pro,
premium

} = require("../controlers/paymentStripe.controller");


router.get('/basic',basic )
router.get('/pro',pro )
router.get('/premium',premium )



module.exports = router;