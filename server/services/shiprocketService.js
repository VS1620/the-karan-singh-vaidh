/**
 * shiprocketService.js
 * Central service for all Shiprocket API interactions.
 * Handles token caching/refresh, order creation, AWB assignment, and tracking.
 */

const axios = require('axios');

const SHIPROCKET_BASE_URL = 'https://apiv2.shiprocket.in/v1/external';

// ─── In-memory token cache ───────────────────────────────────────────────────
let cachedToken = null;
let tokenExpiry = null;

/**
 * Login to Shiprocket and obtain a fresh JWT token.
 * Token is cached in memory for ~9 days (Shiprocket tokens last 10 days).
 */
const loginToShiprocket = async () => {
    const email = process.env.SHIPROCKET_EMAIL;
    const password = process.env.SHIPROCKET_PASSWORD;

    if (!email || !password) {
        throw new Error('Shiprocket credentials (SHIPROCKET_EMAIL / SHIPROCKET_PASSWORD) are missing in .env');
    }

    console.log('🔄 Logging into Shiprocket...');

    const response = await axios.post(`${SHIPROCKET_BASE_URL}/auth/login`, {
        email,
        password
    });

    if (!response.data || !response.data.token) {
        throw new Error('Shiprocket login succeeded but no token returned in response');
    }

    cachedToken = response.data.token;
    // Cache for 9 days (Shiprocket tokens expire in 10 days)
    tokenExpiry = Date.now() + 9 * 24 * 60 * 60 * 1000;

    console.log('✅ Shiprocket token acquired and cached');
    return cachedToken;
};

/**
 * Get the current valid Shiprocket token.
 * Automatically refreshes if expired or forced.
 * @param {boolean} forceRefresh - Force a new login even if token is still valid
 */
const getToken = async (forceRefresh = false) => {
    if (!cachedToken || !tokenExpiry || Date.now() >= tokenExpiry || forceRefresh) {
        return await loginToShiprocket();
    }
    return cachedToken;
};

// ─── Authenticated HTTP helper ────────────────────────────────────────────────

/**
 * Make an authenticated request to the Shiprocket API.
 * Automatically retries once with a fresh token if a 401 is received.
 */
const shiprocketRequest = async (method, path, data = {}, params = {}, retry = true) => {
    try {
        const token = await getToken();
        const response = await axios({
            method,
            url: `${SHIPROCKET_BASE_URL}/${path}`,
            data,
            params,
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            timeout: 15000 // 15 second timeout
        });
        return response.data;
    } catch (error) {
        // If token expired mid-request, refresh and retry once
        if (retry && error.response?.status === 401) {
            console.log('🔄 Shiprocket token expired mid-request, refreshing token...');
            await getToken(true);
            return shiprocketRequest(method, path, data, params, false);
        }

        const errDetail = error.response?.data || error.message;
        console.error(`❌ Shiprocket API Error [${method.toUpperCase()} /${path}]:`, errDetail);
        throw error;
    }
};

// ─── Core Operations ──────────────────────────────────────────────────────────

/**
 * Create a Shiprocket order from a MongoDB Order document.
 * Maps all required fields and calls the adhoc order creation endpoint.
 * @param {Object} order - The full Mongoose Order document
 * @returns {Object} Shiprocket response with order_id and shipment_id
 */
const createShiprocketOrder = async (order) => {
    const nameParts = (order.shippingAddress.name || 'Customer').split(' ');
    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(' ') || '.';

    const pickupLocation = process.env.SHIPROCKET_PICKUP_LOCATION || 'Primary';

    const payload = {
        order_id: order._id.toString(),
        order_date: new Date(order.createdAt || Date.now()).toISOString().split('T')[0],
        pickup_location: pickupLocation,

        // Billing & Shipping (same address)
        billing_customer_name: firstName,
        billing_last_name: lastName,
        billing_address: order.shippingAddress.address,
        billing_city: order.shippingAddress.city,
        billing_pincode: parseInt(order.shippingAddress.postalCode, 10),
        billing_state: order.shippingAddress.state,
        billing_country: 'India',
        billing_email: order.shippingAddress.email,
        billing_phone: order.shippingAddress.phone,
        shipping_is_billing: true,

        // Order items
        order_items: order.orderItems.map(item => ({
            name: `${item.name}${item.pack?.name ? ` - ${item.pack.name}` : ''}`,
            sku: item.product.toString(),
            units: item.qty,
            selling_price: item.price,
            discount: 0,
            tax: 0,
        })),

        payment_method: (order.paymentMethod === 'COD' || order.paymentMethod === 'Cash on Delivery') ? 'COD' : 'Prepaid',
        sub_total: order.totalPrice,

        // Package dimensions (defaults — override via product-level data later if needed)
        length: 15,
        breadth: 12,
        height: 10,
        weight: 0.5,
    };

    console.log(`📦 Creating Shiprocket order [${payload.payment_method}] for MongoDB order: ${order._id}`);
    const response = await shiprocketRequest('POST', 'orders/create/adhoc', payload);

    if (!response || !response.order_id) {
        throw new Error(`Shiprocket order creation failed. Response: ${JSON.stringify(response)}`);
    }

    console.log(`✅ Shiprocket order created. SR Order ID: ${response.order_id}, Shipment ID: ${response.shipment_id}`);
    return response;
};

/**
 * Auto-assign an AWB (Air Waybill) to a Shiprocket shipment.
 * Uses automatic courier selection if no courierId is provided.
 * @param {number|string} shipmentId - Shiprocket's shipment_id from order creation
 * @param {number|null} courierId - Optional specific courier ID (null = auto-assign)
 */
const assignAWB = async (shipmentId, courierId = null) => {
    const payload = { shipment_id: shipmentId };
    if (courierId) payload.courier_id = courierId;

    console.log(`🚚 Assigning AWB to shipment: ${shipmentId}${courierId ? ` with courier ${courierId}` : ' (auto-assign)'}`);
    const response = await shiprocketRequest('POST', 'courier/assign/awb', payload);

    const awb = response?.response?.data?.awb_code || response?.awb_code;
    const courier = response?.response?.data?.courier_name || response?.courier_name;

    if (!awb) {
        console.warn('⚠️ AWB assignment returned no AWB code. Response:', JSON.stringify(response));
        return null;
    }

    console.log(`✅ AWB assigned: ${awb} | Courier: ${courier}`);
    return {
        awb_code: awb,
        courier_name: courier || 'N/A',
        tracking_url: `https://app.shiprocket.in/tracking/${awb}`
    };
};

/**
 * Track a shipment by AWB code.
 * @param {string} awbCode - The AWB code assigned to the shipment
 */
const trackShipment = async (awbCode) => {
    console.log(`🔍 Tracking shipment AWB: ${awbCode}`);
    const response = await shiprocketRequest('GET', `courier/track/awb/${awbCode}`);
    return response;
};

// ─── Orchestrated Full Shipment Flow ─────────────────────────────────────────

/**
 * Full shipment creation pipeline:
 * 1. Create Shiprocket order
 * 2. Assign AWB (auto courier)
 *
 * Returns all shipment fields needed to store in DB.
 * Does NOT throw — returns null on failure so the order can still be saved.
 *
 * @param {Object} order - Full Mongoose Order document
 */
const createFullShipment = async (order) => {
    try {
        // Step 1: Create Shiprocket order
        const orderResponse = await createShiprocketOrder(order);
        const { order_id: shiprocket_order_id, shipment_id } = orderResponse;

        // Step 2: Assign AWB (auto courier)
        let awbData = null;
        if (shipment_id) {
            awbData = await assignAWB(shipment_id);
        } else {
            console.warn(`⚠️ No shipment_id returned from Shiprocket for order ${order._id}`);
        }

        return {
            shiprocket_order_id: shiprocket_order_id?.toString() || null,
            shipment_id: shipment_id?.toString() || null,
            awb_code: awbData?.awb_code || null,
            courier_name: awbData?.courier_name || null,
            tracking_url: awbData?.tracking_url || null,
            shipment_status: awbData?.awb_code ? 'Pickup Scheduled' : 'Order Created',
        };
    } catch (error) {
        const errDetail = error.response?.data || error.message;
        console.error('❌ createFullShipment failed:', errDetail);
        // Return a structured failure so caller can decide what to do
        return null;
    }
};

module.exports = {
    getToken,
    shiprocketRequest,
    createShiprocketOrder,
    assignAWB,
    trackShipment,
    createFullShipment,
};
