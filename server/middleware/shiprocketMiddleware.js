const { getShiprocketToken } = require('../utils/shiprocketAuth');

/**
 * Middleware to ensure a valid Shiprocket token is available for the request
 */
const shiprocketTokenMiddleware = async (req, res, next) => {
    try {
        const token = await getShiprocketToken();
        req.shiprocketToken = token;
        next();
    } catch (error) {
        res.status(500).json({
            message: 'Failed to authenticate with Shiprocket service',
            error: error.message
        });
    }
};

module.exports = {
    shiprocketTokenMiddleware
};
