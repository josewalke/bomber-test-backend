const suscriptionModel = require('../models/suscription.model')

module.exports = {
  basic,
  pro,
  premium
}
const stripe = require('stripe')('sk_live_jOTokUxIvMF19QurvX4KkJko0099KY4GJH')
// const stripe = require('stripe')('sk_test_TjTSauL02STOqR0fzf0jZjII00rIkQjdiq')

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

function handdleError(err, res) {
  console.log(err)
  //return res.status(400).json(err)
}
