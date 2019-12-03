const mongoose = require('mongoose')

const paymentSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId
  },
  payment_date: {
    type: Date
  },
  suscription_type: {
    type: String
  },
  payment_total: {
    type: Number
  },
  transaction_id:{
    type: String
  },
  currency:{
    type: String
  }
})
const paymentModel = mongoose.model('payment', paymentSchema)

module.exports = paymentModel