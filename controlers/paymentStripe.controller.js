const localizacionModel = require('../models/localizacion.model')

module.exports = {
  pago
}
const stripe = require('stripe')('sk_test_I9y5Cytv97AlhMQIOCqNoVrF00Q2NJqGZ2')

async function pago(req,res){

    const paymentIntent = await stripe.paymentIntents.create({
      amount: 30000,
      currency: 'eur',
      // Verify your integration in this guide by including this parameter
      metadata: {integration_check: 'accept_a_payment'},
    });

    res.json(paymentIntent)

}
