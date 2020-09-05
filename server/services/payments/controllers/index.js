// index.js

const paymentIntent = require('./paymentIntent');

module.exports = {
  postCreatePaymentIntent: paymentIntent.postCreatePaymentIntent
};