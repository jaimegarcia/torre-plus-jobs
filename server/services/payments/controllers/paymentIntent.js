const stripe = require("stripe")("sk_test_51HNHGPEnkm8R0LuQ3Ox11MKxOQq5JqVBhZcFP5YcM0CYwHZWTtFd72a8I9yazpYY4knQtn76ZPY4QLXeRYE4PEYb00MMKKE9Dz");

const calculateOrderAmount = items => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return 1400;
};

/**
 * Get Client Secret for Payment Intent from Stripe
 * @param  {} req
 * @param  {} res
 */
exports.postCreatePaymentIntent = async (req, res) => {
  const { items } = req.body;
  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: "usd"
  });
  res.send({
    clientSecret: paymentIntent.client_secret
  });
}
