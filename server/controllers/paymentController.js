/**
 * paymentController.js
 * Handles Razorpay order creation and payment verification.
 * After successful verification, automatically triggers Shiprocket shipment creation.
 */

const asyncHandler = require('express-async-handler');
const Razorpay = require('razorpay');
const crypto = require('crypto');
const Order = require('../models/Order');
const { createFullShipment } = require('../services/shiprocketService');

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// ─────────────────────────────────────────────────────────────────────────────
/**
 * @desc    Create Razorpay order (before payment)
 * @route   POST /api/payment/order
 * @access  Private
 */
const createRazorpayOrder = asyncHandler(async (req, res) => {
    const { amount } = req.body;

    if (!amount) {
        res.status(400);
        throw new Error('Amount is required');
    }

    const options = {
        amount: Math.round(amount * 100), // Convert to paise
        currency: 'INR',
        receipt: `rcpt_${Date.now()}`,
    };

    try {
        const order = await razorpay.orders.create(options);
        res.status(201).json(order);
    } catch (error) {
        console.error('❌ Razorpay Order Creation Error:', error);
        res.status(500);
        throw new Error(error.error?.description || error.message || 'Razorpay order creation failed');
    }
});

// ─────────────────────────────────────────────────────────────────────────────
/**
 * @desc    Verify Razorpay payment signature. On success, auto-create Shiprocket shipment.
 * @route   POST /api/payment/verify
 * @access  Private
 * @body    { razorpay_order_id, razorpay_payment_id, razorpay_signature, mongo_order_id? }
 */
const verifyPayment = asyncHandler(async (req, res) => {
    const {
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
        mongo_order_id  // Optional: if provided, auto-create shipment after verify
    } = req.body;

    // ── 1. Verify Razorpay signature ──────────────────────────────────────────
    const body = `${razorpay_order_id}|${razorpay_payment_id}`;

    const expectedSignature = crypto
        .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
        .update(body)
        .digest('hex');

    const isAuthentic = expectedSignature === razorpay_signature;

    if (!isAuthentic) {
        res.status(400);
        throw new Error('Invalid payment signature — verification failed');
    }

    // ── 2. Payment is verified ────────────────────────────────────────────────
    console.log(`[PAYMENT] ✅ Razorpay signature verified: ${razorpay_payment_id}`);

    // ── 3. Auto-create Shiprocket shipment for successful prepaid payment ─────
    let shiprocketData = null;
    if (mongo_order_id) {
        try {
            const order = await Order.findById(mongo_order_id);

            if (order) {
                // Important: Mark as paid first
                order.isPaid = true;
                order.paidAt = Date.now();
                order.payment_status = 'Completed';
                order.razorpay_payment_id = razorpay_payment_id;
                await order.save();

                console.log(`[PAYMENT] 📦 Creating Shiprocket shipment for prepaid order: ${mongo_order_id}`);
                shiprocketData = await createFullShipment(order);

                if (shiprocketData) {
                    order.shiprocket_order_id = shiprocketData.shiprocket_order_id;
                    order.shipment_id = shiprocketData.shipment_id;
                    order.awb_code = shiprocketData.awb_code;
                    order.courier_name = shiprocketData.courier_name;
                    order.tracking_url = shiprocketData.tracking_url;
                    order.shipment_status = shiprocketData.shipment_status;
                    
                    // Set the main order status to Processing
                    order.status = 'Processing';
                    
                    await order.save();

                    console.log(`[PAYMENT] ✅ Shiprocket shipment created for order ${mongo_order_id} | AWB: ${shiprocketData.awb_code}`);
                } else {
                    console.error(`[PAYMENT] ❌ Shiprocket auto-create returned null for order ${mongo_order_id}`);
                    order.shipment_status = 'Shipment Failed - Manual Action Required';
                    await order.save();
                }
            } else {
                console.error(`[PAYMENT] ❌ Order not found for shipment creation: ${mongo_order_id}`);
            }
        } catch (shipErr) {
            console.error('[PAYMENT] ❌ Shiprocket integration error:', shipErr.message);
            // Non-blocking but logged
        }
    }

    res.status(200).json({
        success: true,
        message: 'Payment verified successfully',
        razorpay_payment_id,
        shiprocket: shiprocketData ? {
            shiprocket_order_id: shiprocketData.shiprocket_order_id,
            awb_code: shiprocketData.awb_code,
            courier_name: shiprocketData.courier_name,
            tracking_url: shiprocketData.tracking_url,
            shipment_status: shiprocketData.shipment_status,
        } : null,
    });
});

module.exports = {
    createRazorpayOrder,
    verifyPayment,
};
