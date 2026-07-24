import Razorpay from 'razorpay';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { amount, currency = 'INR', receipt } = req.body;

  // Validate amount (must be at least 100 paise = ₹1)
  if (!amount || typeof amount !== 'number' || amount < 100) {
    return res.status(400).json({ error: 'Invalid amount. Must be >= 100 paise.' });
  }

  try {
    const order = await razorpay.orders.create({
      amount,            // already in paise
      currency,
      receipt: receipt || `receipt_${Date.now()}`,
    });

    return res.status(200).json({
      order_id: order.id,
      amount: order.amount,
      currency: order.currency,
    });
  } catch (err) {
    console.error('Razorpay create-order error:', err);

    if (err.statusCode === 401) {
      return res.status(401).json({ error: 'Razorpay authentication failed. Check API credentials.' });
    }

    return res.status(500).json({ error: 'Failed to create Razorpay order.', details: err.error?.description || err.message });
  }
}
