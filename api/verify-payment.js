import crypto from 'crypto';

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  // Validate that all three fields are present
  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    return res.status(400).json({ error: 'Missing required payment fields.' });
  }

  try {
    // HMAC-SHA256 of "order_id|payment_id" signed with KEY_SECRET
    const body = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest('hex');

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ success: false, error: 'Signature mismatch. Payment verification failed.' });
    }

    // Signatures match — payment is genuine
    return res.status(200).json({
      success: true,
      razorpay_payment_id,
      razorpay_order_id,
    });
  } catch (err) {
    console.error('Razorpay verify-payment error:', err);
    return res.status(500).json({ error: 'Internal server error during payment verification.' });
  }
}
