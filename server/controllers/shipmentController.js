/**
 * shipmentController.js
 * Handles:
 *   POST /api/shipment/create  — manually push an order to Shiprocket
 *   GET  /api/shipment/track/:orderId — fetch live tracking for an order
 */

const asyncHandler = require('express-async-handler');
const Order = require('../models/Order');
const { createFullShipment, trackShipment } = require('../services/shiprocketService');

// ─────────────────────────────────────────────────────────────────────────────
/**
 * @desc    Create Shiprocket shipment for a given MongoDB order ID
 * @route   POST /api/shipment/create
 * @access  Private (called from checkout after payment)
 * @body    { order_id: String, razorpay_payment_id?: String }
 */
const createShipment = asyncHandler(async (req, res) => {
    const { order_id, razorpay_payment_id } = req.body;

    if (!order_id) {
        res.status(400);
        throw new Error('order_id is required');
    }

    // 1. Fetch the order from MongoDB
    const order = await Order.findById(order_id);
    if (!order) {
        res.status(404);
        throw new Error(`Order not found: ${order_id}`);
    }

    // 2. Avoid duplicate Shiprocket orders
    if (order.shiprocket_order_id) {
        return res.status(200).json({
            message: 'Shipment already created for this order',
            shiprocket_order_id: order.shiprocket_order_id,
            awb_code: order.awb_code,
            courier_name: order.courier_name,
            tracking_url: order.tracking_url,
            shipment_status: order.shipment_status,
        });
    }

    // 3. Call Shiprocket — create order + assign AWB
    const shipmentData = await createFullShipment(order);

    if (!shipmentData) {
        // Shiprocket failed — don't block the user, return a soft error
        console.error(`❌ Shiprocket shipment failed for order ${order_id}`);
        return res.status(200).json({
            success: false,
            message: 'Order confirmed. Shipment creation failed — our team will process it manually.',
        });
    }

    // 4. Persist shipment fields to MongoDB Order document
    order.razorpay_payment_id = razorpay_payment_id || order.razorpay_payment_id;
    order.shiprocket_order_id = shipmentData.shiprocket_order_id;
    order.shipment_id = shipmentData.shipment_id;
    order.awb_code = shipmentData.awb_code;
    order.courier_name = shipmentData.courier_name;
    order.tracking_url = shipmentData.tracking_url;
    order.shipment_status = shipmentData.shipment_status;

    await order.save();

    console.log(`✅ Shipment saved to DB for order ${order_id} | AWB: ${shipmentData.awb_code}`);

    res.status(201).json({
        success: true,
        message: 'Shipment created successfully',
        shiprocket_order_id: shipmentData.shiprocket_order_id,
        awb_code: shipmentData.awb_code,
        courier_name: shipmentData.courier_name,
        tracking_url: shipmentData.tracking_url,
        shipment_status: shipmentData.shipment_status,
    });
});

// ─────────────────────────────────────────────────────────────────────────────
/**
 * @desc    Track a shipment by MongoDB orderId (fetches AWB from DB, then queries Shiprocket)
 * @route   GET /api/shipment/track/:orderId
 * @access  Public
 */
const trackOrder = asyncHandler(async (req, res) => {
    const { orderId } = req.params;

    // 1. Fetch order from DB to get AWB
    const order = await Order.findById(orderId).select(
        'awb_code courier_name tracking_url shipment_status shiprocket_order_id'
    );

    if (!order) {
        res.status(404);
        throw new Error(`Order not found: ${orderId}`);
    }

    if (!order.awb_code) {
        return res.status(200).json({
            success: false,
            message: 'No shipment tracking information available yet for this order.',
            shipment_status: order.shipment_status || 'Pending',
        });
    }

    // 2. Fetch live tracking from Shiprocket
    let liveTracking = null;
    try {
        liveTracking = await trackShipment(order.awb_code);
    } catch (err) {
        console.warn(`⚠️ Live tracking fetch failed for AWB ${order.awb_code}:`, err.message);
        // Still return what we have in DB
    }

    res.status(200).json({
        success: true,
        awb_code: order.awb_code,
        courier_name: order.courier_name,
        tracking_url: order.tracking_url,
        shipment_status: order.shipment_status,
        shiprocket_order_id: order.shiprocket_order_id,
        live_tracking: liveTracking || null,
    });
});

module.exports = { createShipment, trackOrder };
