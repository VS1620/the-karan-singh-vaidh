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
    try {
        const nameParts = (order.shippingAddress.name || 'Customer').trim().split(/\s+/);
        const firstName = nameParts[0];
        const lastName = nameParts.slice(1).join(' ') || '.';

        const pickupLocation = process.env.SHIPROCKET_PICKUP_LOCATION || 'Primary';

        // Sanitize phone number: strip all non-digits and take last 10
        let phone = (order.shippingAddress.phone || '').replace(/\D/g, '');
        if (phone.length > 10) phone = phone.slice(-10);
        if (phone.length < 10) phone = '9999999999'; // Fallback to avoid API error if invalid

        // Sanitize pincode
        let pincode = parseInt((order.shippingAddress.postalCode || '000000').toString().replace(/\D/g, ''), 10);
        if (isNaN(pincode)) pincode = 0;

        // Sanitize address: must be at least 10 characters
        let address = order.shippingAddress.address || '';
        if (address.length < 10) {
            address = `${address}, ${order.shippingAddress.city || ''}, ${order.shippingAddress.state || ''}`.trim();
        }
        // If still too short, pad it (Shiprocket requirement)
        if (address.length < 10) address = address.padEnd(10, '.');

        const payload = {
            order_id: order._id.toString(),
            order_date: new Date(order.createdAt || Date.now()).toISOString().split('T')[0],
            pickup_location: pickupLocation,

            // Billing & Shipping (same address)
            billing_customer_name: firstName,
            billing_last_name: lastName,
            billing_address: address,
            billing_city: order.shippingAddress.city || 'NA',
            billing_pincode: pincode,
            billing_state: order.shippingAddress.state || 'NA',
            billing_country: 'India',
            billing_email: order.shippingAddress.email || order.user?.email || 'customer@example.com',
            billing_phone: phone,
            shipping_is_billing: true,

            // Order items
            order_items: order.orderItems.map(item => ({
                name: `${item.name}${item.pack?.name ? ` - ${item.pack.name}` : ''}`.substring(0, 50),
                sku: (item.product?._id || item.product || 'SKU-NA').toString().substring(0, 20),
                units: item.qty || 1,
                selling_price: item.price || 0,
                discount: 0,
                tax: 0,
            })),

            payment_method: (order.paymentMethod === 'COD' || order.paymentMethod === 'Cash on Delivery') ? 'COD' : 'Prepaid',
            sub_total: order.totalPrice || 0,

            // Package dimensions (defaults)
            length: 15,
            breadth: 12,
            height: 10,
            weight: 0.5,
        };

        console.log(`[SHIPROCKET] 📦 Creating order [${payload.payment_method}] for MongoDB order: ${order._id}`);
        
        try {
            const response = await shiprocketRequest('POST', 'orders/create/adhoc', payload);

            if (!response || !response.order_id) {
                const detailedError = response ? (response.message || JSON.stringify(response)) : 'Empty response';
                console.error(`[SHIPROCKET] ❌ order creation failed. Response:`, detailedError);
                throw new Error(`Shiprocket API responded without order_id: ${detailedError}`);
            }

            console.log(`[SHIPROCKET] ✅ order created. SR Order ID: ${response.order_id}, Shipment ID: ${response.shipment_id}`);
            return response;
        } catch (error) {
            // Special handling for duplicate order ID error
            const errorData = error.response?.data;
            if (errorData?.errors?.order_id?.[0]?.includes('already been taken')) {
                console.warn(`[SHIPROCKET] ⚠️ Order ID ${order._id} already exists in Shiprocket.`);
                throw new Error('Order already exists in Shiprocket.');
            }
            throw error;
        }
    } catch (error) {
        const errorMsg = error.response?.data?.message || 
                         (error.response?.data?.errors ? JSON.stringify(error.response.data.errors) : null) || 
                         error.message;
        console.error(`[SHIPROCKET] ❌ Error in createShiprocketOrder:`, errorMsg);
        throw new Error(errorMsg);
    }
};

/**
 * Auto-assign an AWB (Air Waybill) to a Shiprocket shipment.
 * Uses automatic courier selection if no courierId is provided.
 * @param {number|string} shipmentId - Shiprocket's shipment_id from order creation
 * @param {number|null} courierId - Optional specific courier ID (null = auto-assign)
 */
const assignAWB = async (shipmentId, courierId = null) => {
    try {
        const payload = { shipment_id: shipmentId };
        if (courierId) payload.courier_id = courierId;

        console.log(`[SHIPROCKET] 🚚 Assigning AWB to shipment: ${shipmentId}${courierId ? ` with courier ${courierId}` : ' (auto-assign)'}`);
        const response = await shiprocketRequest('POST', 'courier/assign/awb', payload);

        // Debugging response structure
        console.log(`[SHIPROCKET] AWB Response:`, JSON.stringify(response, null, 2));

        const awb = response?.response?.data?.awb_code || response?.awb_code;
        const courier = response?.response?.data?.courier_name || response?.courier_name;

        if (!awb) {
            console.warn('[SHIPROCKET] ⚠️ AWB assignment returned no AWB code.');
            return null;
        }

        console.log(`[SHIPROCKET] ✅ AWB assigned: ${awb} | Courier: ${courier}`);
        return {
            awb_code: awb,
            courier_name: courier || 'N/A',
            tracking_url: `https://app.shiprocket.in/tracking/${awb}`
        };
    } catch (error) {
        console.error(`[SHIPROCKET] ❌ Error in assignAWB:`, error.response?.data || error.message);
        return null;
    }
};

/**
 * Track a shipment by AWB code.
 * @param {string} awbCode - The AWB code assigned to the shipment
 */
const trackShipment = async (awbCode) => {
    console.log(`[SHIPROCKET] 🔍 Tracking shipment AWB: ${awbCode}`);
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
 * Returns { error: string } on failure instead of null.
 *
 * @param {Object} order - Full Mongoose Order document
 */
const createFullShipment = async (order) => {
    try {
        // Step 1: Create Shiprocket order
        const orderResponse = await createShiprocketOrder(order);
        const { order_id: shiprocket_order_id, shipment_id } = orderResponse;

        // Step 2: Assign AWB (auto courier)
        // NOTE: Keeping this commented out as per previous design to keep orders in "NEW" tab.
        /*
        let awbData = null;
        if (shipment_id) {
            awbData = await assignAWB(shipment_id);
        }
        */

        return {
            shiprocket_order_id: shiprocket_order_id?.toString() || null,
            shipment_id: shipment_id?.toString() || null,
            awb_code: null, 
            courier_name: null,
            tracking_url: null,
            shipment_status: 'Order Created',
        };
    } catch (error) {
        console.error('[SHIPROCKET] ❌ createFullShipment failed:', error.message);
        return { error: error.message };
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
