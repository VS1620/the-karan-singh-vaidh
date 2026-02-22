const express = require('express');
const router = express.Router();
const Joi = require('joi');
const rateLimit = require('express-rate-limit');
const {
    createOrder,
    checkCourier,
    generateAWB,
    trackOrder
} = require('../controllers/shiprocketController');

// Rate Limiter: 100 requests per 15 minutes
const shiprocketLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: { message: 'Too many requests from this IP, please try again after 15 minutes' }
});

// Validation Schemas
const createOrderSchema = Joi.object({
    order_id: Joi.string().required(),
    order_date: Joi.string().required(),
    pickup_location: Joi.string().required(),
    billing_customer_name: Joi.string().required(),
    billing_last_name: Joi.string().optional().allow(''),
    billing_address: Joi.string().required(),
    billing_city: Joi.string().required(),
    billing_pincode: Joi.number().required(),
    billing_state: Joi.string().required(),
    billing_country: Joi.string().required(),
    billing_email: Joi.string().email().required(),
    billing_phone: Joi.string().required(),
    shipping_is_billing: Joi.boolean().required(),
    order_items: Joi.array().items(Joi.object({
        name: Joi.string().required(),
        sku: Joi.string().required(),
        units: Joi.number().required(),
        selling_price: Joi.number().required(),
    })).required(),
    payment_method: Joi.string().valid('Prepaid', 'COD').required(),
    sub_total: Joi.number().required(),
    length: Joi.number().required(),
    breadth: Joi.number().required(),
    height: Joi.number().required(),
    weight: Joi.number().required(),
}).unknown(true);

const checkCourierSchema = Joi.object({
    pickup_postcode: Joi.number().required(),
    delivery_postcode: Joi.number().required(),
    weight: Joi.number().required(),
    cod: Joi.number().valid(0, 1).required(),
});

const generateAWBSchema = Joi.object({
    shipment_id: Joi.number().required(),
    courier_id: Joi.number().optional(),
});

// Validation Middleware
const validate = (schema) => (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    next();
};

// Routes
router.use(shiprocketLimiter);

router.post('/create-order', validate(createOrderSchema), createOrder);
router.post('/check-courier', validate(checkCourierSchema), checkCourier);
router.post('/generate-awb', validate(generateAWBSchema), generateAWB);
router.get('/track/:awb', trackOrder);

module.exports = router;
