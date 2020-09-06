

const Axios = require('axios');
const https = require('https');

const httpsAgent = new https.Agent();
const axios = Axios.create({ httpsAgent,timeout:10000 });
const dotenv = require('dotenv');
dotenv.config({ path: '.env.example' });
const stripe = require("stripe")(process.env.STRIPE_SKEY);

const nonDecimalCurrencies=['BIF','CLP','DJF','GNF','JPY','KMF','KRW','MGA','PYG','RWF','UGX','VND','VUV','XAF','XOF','XPF'];

/**
 * Get Client Secret for Payment Intent from Stripe related to a Mentor
 * @param  {String} req.body.mentor
 * @param  {} res
 */
exports.postCreatePaymentIntent = async (req, res) => {
  const { mentor } = req.body;
  if(!mentor) return res.status(400).json({error:`You need to include a valid Mentor `});

  const endpoint="http://localhost:8080/services/mentors/" //Get mentor compensation
  const mentorData=await axios.get(
    endpoint + `${mentor}`,
    {headers: {'Content-Type': 'application/json'}},
  );

  const compensation=mentorData.data.mentor.compensation;
  let amount=compensation.amount;
  const currency=compensation.currency;
  if(nonDecimalCurrencies.indexOf(currency)<0) amount=amount*100;
  const paymentIntent = await stripe.paymentIntents.create({
    amount, 
    currency,
    metadata:{mentor}
  });
  res.send({
    clientSecret: paymentIntent.client_secret,
    amount: compensation.amount,
    currency: compensation.currency,
    symbol:compensation.symbol
  });
}
