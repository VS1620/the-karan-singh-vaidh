const axios = require('axios');
const asyncHandler = require('express-async-handler');
const { getShiprocketToken } = require('../utils/shiprocketAuth');

/**
 * Helper to make authenticated requests to Shiprocket with retry on 401
 */
const shiprocketRequest = async (method, url, data = {}, params = {}, retry = true) => {
    try {
        const token = await getShiprocketToken();
        const response = await axios({
            method,
            url: `https://apiv2.shiprocket.in/v1/external/${url}`,
            data,
            params,
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        if (retry && error.response?.status === 401) {
            console.log('🔄 Shiprocket token expired during request, refreshing...');
            await getShiprocketToken(true); // Force refresh
            return shiprocketRequest(method, url, data, params, false); // Retry once
        }
        console.error(`❌ Shiprocket API Error [${url}]:`, error.response?.data || error.message);
        throw error;
    }
};

/**
 * @desc    Create a new custom order in Shiprocket
 * @route   POST /api/shiprocket/create-order
 * @access  Private (App Auth)
 */
const createOrder = asyncHandler(async (req, res) => {
    // Shiprocket expects a specific structure. Basic validation is handled by Joi middleware.
    const orderData = req.body;

    const response = await shiprocketRequest('POST', 'orders/create/adhoc', orderData);
    res.status(201).json(response);
});

/**
 * @desc    Check courier serviceability
 * @route   POST /api/shiprocket/check-courier
 * @access  Private (App Auth)
 */
const checkCourier = asyncHandler(async (req, res) => {
    const { pickup_postcode, delivery_postcode, weight, cod } = req.body;

    const response = await shiprocketRequest('GET', 'courier/serviceability', {}, {
        pickup_postcode,
        delivery_postcode,
        weight,
        cod
    });
    res.status(200).json(response);
});

/**
 * @desc    Generate AWB for an order
 * @route   POST /api/shiprocket/generate-awb
 * @access  Private (App Auth)
 */
const generateAWB = asyncHandler(async (req, res) => {
    const { shipment_id, courier_id } = req.body;

    const response = await shiprocketRequest('POST', 'courier/assign/awb', {
        shipment_id,
        courier_id
    });
    res.status(200).json(response);
});

/**
 * @desc    Track a shipment by AWB
 * @route   GET /api/shiprocket/track/:awb
 * @access  Public (Optional App Auth)
 */
const trackOrder = asyncHandler(async (req, res) => {
    const { awb } = req.params;

    const response = await shiprocketRequest('GET', `courier/track/awb/${awb}`);
    res.status(200).json(response);
});

/**
 * Internal helper to map and push order to Shiprocket
 * This can be called from other controllers
 */
const pushOrderToShiprocket = async (order) => {
    try {
        const shiprocketPayload = {
            order_id: order._id.toString(),
            order_date: new Date(order.createdAt).toISOString().split('T')[0],
            pickup_location: "Primary", // This must match the pickup location name in Shiprocket dashboard
            billing_customer_name: order.shippingAddress.name.split(' ')[0],
            billing_last_name: order.shippingAddress.name.split(' ').slice(1).join(' ') || '.',
            billing_address: order.shippingAddress.address,
            billing_city: order.shippingAddress.city,
            billing_pincode: order.shippingAddress.postalCode,
            billing_state: order.shippingAddress.state || 'Delhi', // Use state from order, with fallback
            billing_country: "India",
            billing_email: order.shippingAddress.email,
            billing_phone: order.shippingAddress.phone,
            shipping_is_billing: true,
            order_items: order.orderItems.map(item => ({
                name: item.name,
                sku: item.product.toString(),
                units: item.qty,
                selling_price: item.price,
            })),
            payment_method: order.paymentMethod === 'COD' ? 'COD' : 'Prepaid',
            sub_total: order.totalPrice,
            length: 10, // Default dimensions
            breadth: 10,
            height: 10,
            weight: 0.5, // Default weight in kg
        };

        const response = await shiprocketRequest('POST', 'orders/create/adhoc', shiprocketPayload);
        if (response && response.shipment_id) {
            console.log(`✅ Order ${order._id} pushed to Shiprocket. Shipment ID: ${response.shipment_id}`);
        }
        return response;
    } catch (error) {
        console.error('❌ Failed to push order to Shiprocket:', error.response?.data || error.message);
        return null;
    }
};

module.exports = {
    createOrder,
    checkCourier,
    generateAWB,
    trackOrder,
    pushOrderToShiprocket
};
