const express = require('express');
const Razorpay = require('razorpay');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5008;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: 'rzp_test_lDORU8ubUww3TT', // Replace with your Razorpay Key ID
  key_secret: 'ofNIgJ54UImKH634Pecqms1e', // Replace with your Razorpay Key Secret
});

// Endpoint to create a Razorpay order
app.post('/api/create-order', async (req, res) => {
  const { amount, currency } = req.body;

  const options = {
    amount: amount, // Amount in paise (e.g., 1000 paise = ₹10)
    currency: currency || 'INR',
    receipt: 'order_receipt_1',
  };

  try {
    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint to verify payment
app.post('/api/verify-payment', async (req, res) => {
  const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;

  const crypto = require('crypto');
  const hmac = crypto.createHmac('sha256', 'YOUR_RAZORPAY_KEY_SECRET');
  hmac.update(razorpay_order_id + '|' + razorpay_payment_id);
  const generatedSignature = hmac.digest('hex');

  if (generatedSignature === razorpay_signature) {
    // Payment is successful
    res.json({ success: true });
  } else {
    // Payment verification failed
    res.status(400).json({ success: false, error: 'Invalid signature' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});