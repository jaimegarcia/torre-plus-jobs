const express = require('express')
const controllers = require('./controllers')

const router = express.Router();

router.post('/create-payment-intent',controllers.postCreatePaymentIntent)

exports.router =  router;