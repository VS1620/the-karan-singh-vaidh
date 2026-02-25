/**
 * shipmentRoutes.js
 * Routes for shipment creation and tracking.
 *
 * POST /api/shipment/create      — create Shiprocket shipment for an order
 * GET  /api/shipment/track/:orderId — track shipment by MongoDB order ID
 */

const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const { createShipment, trackOrder } = require('../controllers/shipmentController');

// Rate limiter — 50 requests per 15 minutes
const shipmentLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 50,
    message: { message: 'Too many shipment requests, please try again later.' }
});

router.use(shipmentLimiter);

// POST /api/shipment/create
router.post('/create', createShipment);

// GET /api/shipment/track/:orderId
router.get('/track/:orderId', trackOrder);

module.exports = router;
