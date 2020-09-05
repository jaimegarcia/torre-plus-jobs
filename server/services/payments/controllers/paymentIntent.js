

const Axios = require('axios');
const https = require('https');

const httpsAgent = new https.Agent();
const axios = Axios.create({ httpsAgent,timeout:10000 });

const stripe = require("stripe")("sk_test_51HNHGPEnkm8R0LuQ3Ox11MKxOQq5JqVBhZcFP5YcM0CYwHZWTtFd72a8I9yazpYY4knQtn76ZPY4QLXeRYE4PEYb00MMKKE9Dz");


/**
 * Get Client Secret for Payment Intent from Stripe
 * @param  {} req
 * @param  {} res
 */
exports.postCreatePaymentIntent = async (req, res) => {
  const { mentor } = req.body;
  const endpoint="http://localhost:8080/services/mentors/"
  const mentorData=await axios.get(
    endpoint + `${mentor}`,
    {headers: {'Content-Type': 'application/json'}},
  );
  console.log("mentorData",mentorData)

  const compensation=mentorData.data.mentor.compensation;

  const paymentIntent = await stripe.paymentIntents.create({
    amount: compensation.amount*100, //TODO: Add exceptions to certain currencies
    currency: compensation.currency
  });
  res.send({
    clientSecret: paymentIntent.client_secret,
    amount: compensation.amount,
    currency: compensation.currency,
    symbol:compensation.symbol
  });
}
