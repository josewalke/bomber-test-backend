const stripe = require('stripe')('sk_test_ewgmbw9gpM9ACer8aGFZxs5m00a2KifRCB')

(async() => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 100,
    currency: 'eur'
  });
})();