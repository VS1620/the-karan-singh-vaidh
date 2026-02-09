const asyncHandler = require('express-async-handler');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

// Store OTPs in memory (Phone -> { otp, expires })
const otpStore = new Map();

// API Credentials (from USER_REQUEST & PHP Code)
const SMS_API_CONFIG = {
    url: process.env.SMS_API_URL || 'https://login.smsmedia.org/app/smsapi/index.php',
    username: process.env.SMS_API_USERNAME,
    password: process.env.SMS_API_PASSWORD,
    key: process.env.SMS_API_KEY,
    senderId: process.env.SMS_API_SENDER_ID,
    templateId: process.env.SMS_API_TEMPLATE_ID,
    entityId: process.env.SMS_API_ENTITY_ID,
    campaign: process.env.SMS_API_CAMPAIGN || '10598',
    routeid: process.env.SMS_API_ROUTE_ID || '100867'
};

/**
 * @desc    Generate and send OTP
 * @route   POST /api/otp/send
 * @access  Public
 */
const sendOTP = asyncHandler(async (req, res) => {
    const { phone } = req.body;

    if (!phone || phone.length !== 10) {
        res.status(400);
        throw new Error('Please provide a valid 10-digit phone number');
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expires = Date.now() + 5 * 60 * 1000; // 5 minutes

    otpStore.set(phone, { otp, expires });

    // EXACT Template Message (MUST MATCH PHP Exactly including \n)
    const message = `Dear Customer, your OTP for registration with KARAN SINGH VAIDH is ${otp}. Please use this code to complete your sign-up on www.thekaransinghvaidh.com\n-KARAN SINGH VAIDH`;

    const params = new URLSearchParams({
        username: SMS_API_CONFIG.username,
        password: SMS_API_CONFIG.password,
        key: SMS_API_CONFIG.key,
        campaign: SMS_API_CONFIG.campaign,
        routeid: SMS_API_CONFIG.routeid,
        type: 'text',
        contacts: phone,
        senderid: SMS_API_CONFIG.senderId,
        msg: message,
        template_id: SMS_API_CONFIG.templateId,
        pe_id: SMS_API_CONFIG.entityId,
    });

    try {
        console.log(`Sending OTP to ${phone}...`);

        const response = await fetch(SMS_API_CONFIG.url, {
            method: 'POST',
            body: params,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        const result = await response.text();
        console.log(`SMS API Response: ${result}`);

        res.status(200).json({
            success: true,
            message: 'OTP sent successfully',
        });
    } catch (error) {
        console.error('Error sending SMS:', error);
        res.status(500);
        throw new Error('Failed to send OTP. Please try again later.');
    }
});

/**
 * @desc    Verify OTP
 * @route   POST /api/otp/verify
 * @access  Public
 */
const verifyOTP = asyncHandler(async (req, res) => {
    const { phone, otp } = req.body;

    if (!phone || !otp) {
        res.status(400);
        throw new Error('Please provide phone number and OTP');
    }

    const storedData = otpStore.get(phone);

    if (!storedData) {
        res.status(400);
        throw new Error('OTP not found for this number. Please resend.');
    }

    if (Date.now() > storedData.expires) {
        otpStore.delete(phone);
        res.status(400);
        throw new Error('OTP has expired. Please request a new one.');
    }

    if (storedData.otp !== otp) {
        res.status(400);
        throw new Error('Incorrect OTP. Please try again.');
    }

    // Success - clean up and confirm
    otpStore.delete(phone);
    res.status(200).json({
        success: true,
        message: 'OTP verified successfully'
    });
});

module.exports = { sendOTP, verifyOTP };
