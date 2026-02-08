const asyncHandler = require('express-async-handler');
const Razorpay = require('razorpay');
const crypto = require('crypto');

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// @desc    Create Razorpay order
// @route   POST /api/payment/order
// @access  Private
const createRazorpayOrder = asyncHandler(async (req, res) => {
    const { amount } = req.body;

    if (!amount) {
        res.status(400);
        throw new Error('Amount is required');
    }

    const options = {
        amount: Math.round(amount * 100), // amount in the smallest currency unit (paise)
        currency: 'INR',
        receipt: `receipt_order_${Date.now()}`,
    };

    try {
        const order = await razorpay.orders.create(options);
        res.status(201).json(order);
    } catch (error) {
        console.error('Razorpay Order Error:', error);
        res.status(500);
        throw new Error('Razorpay order creation failed');
    }
});

// @desc    Verify Razorpay payment
// @route   POST /api/payment/verify
// @access  Private
const verifyPayment = asyncHandler(async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
        .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
        .update(body.toString())
        .digest('hex');

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
        res.status(200).json({
            message: 'Payment verified successfully',
            success: true,
        });
    } else {
        res.status(400);
        throw new Error('Invalid signature, payment verification failed');
    }
});

module.exports = {
    createRazorpayOrder,
    verifyPayment,
};
