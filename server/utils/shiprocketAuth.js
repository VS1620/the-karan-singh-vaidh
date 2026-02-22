const axios = require('axios');

let cachedToken = null;
let tokenExpiry = null;

/**
 * Login to Shiprocket and get a new token
 * @returns {Promise<string>}
 */
const loginToShiprocket = async () => {
    try {
        const email = process.env.SHIPROCKET_EMAIL;
        const password = process.env.SHIPROCKET_PASSWORD;

        if (!email || !password) {
            throw new Error('Shiprocket credentials missing in .env');
        }

        console.log('🔄 Logging into Shiprocket...');
        const response = await axios.post('https://apiv2.shiprocket.in/v1/external/auth/login', {
            email,
            password
        });

        if (response.data && response.data.token) {
            cachedToken = response.data.token;
            // Shiprocket tokens are usually valid for 10 days. 
            // We set expiry to 9 days to be safe.
            tokenExpiry = Date.now() + 9 * 24 * 60 * 60 * 1000;
            console.log('✅ Shiprocket token acquired');
            return cachedToken;
        } else {
            throw new Error('Failed to retrieve token from Shiprocket');
        }
    } catch (error) {
        console.error('❌ Shiprocket Login Error:', error.response?.data || error.message);
        throw error;
    }
};

/**
 * Get the current Shiprocket token, refreshing it if necessary
 * @returns {Promise<string>}
 */
const getShiprocketToken = async (forceRefresh = false) => {
    if (!cachedToken || !tokenExpiry || Date.now() >= tokenExpiry || forceRefresh) {
        return await loginToShiprocket();
    }
    return cachedToken;
};

module.exports = {
    getShiprocketToken
};
