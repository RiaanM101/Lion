const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.checkout = async (req, res) => {
  const { id, amount } = req.body;

  try {
    const payment = await stripe.paymentIntents.create({
      amount: amount * 100, // Amount in cents
      currency: 'zar',
      payment_method: id,
      confirm: true,
    });

    res.status(200).json({ success: true, payment });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
