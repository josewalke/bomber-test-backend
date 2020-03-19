const router = require("express").Router();
const { authenticated, me } = require("../services/auth.service");

const {
pago
} = require("../controlers/paymentStripe.controller");

// import Stripe from '@stripe/stripe-js'

router.get('/', pago)

module.exports = router;