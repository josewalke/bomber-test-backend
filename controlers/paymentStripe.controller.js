const suscriptionModel = require('../models/suscription.model')

module.exports = {
  basic,
  pro,
  premium
}
const stripe = require('stripe')('pk_test_ezWwY83XHKU9CtONibdNYGXA00plca98gw')

async function basic(req,res){
  suscriptionModel
  .find({name: 'Basic'})
  .then(async response => {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 100 * response[0].precio,
      currency: 'eur',
      // Verify your integration in this guide by including this parameter
      metadata: {integration_check: 'accept_a_payment'},
    });
    res.json(paymentIntent)
  })
  .catch((err) => handdleError(err, res))

}
async function pro(req,res){
  suscriptionModel
  .find({name: 'Pro'})
  .then(async response => {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 100 * response[0].precio,
      currency: 'eur',
      // Verify your integration in this guide by including this parameter
      metadata: {integration_check: 'accept_a_payment'},
    });
    res.json(paymentIntent)
  })
  .catch((err) => handdleError(err, res))
}
async function premium(req,res){
  suscriptionModel
  .find({name: 'Premium'})
  .then(async response => {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 100 * response[0].precio,
      currency: 'eur',
      // Verify your integration in this guide by including this parameter
      metadata: {integration_check: 'accept_a_payment'},
    });
    res.json(paymentIntent)
  })
  .catch((err) => handdleError(err, res))
}
