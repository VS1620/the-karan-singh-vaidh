const asyncHandler = require('express-async-handler');
const OTP = require('../models/OTP');

/**
 * We use node-fetch for compatibility as it's already in the package.json.
 */
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

// SMSMedia API Details
const SMS_API_CONFIG = {
    url: process.env.SMS_API_URL || 'https://login.smsmedia.org/app/smsapi/index.php',
    username: process.env.SMS_API_USERNAME || 'KSV',
    password: process.env.SMS_API_PASSWORD || 'KSV',
    key: process.env.SMS_API_KEY || '5691C5CFEA6273',
    senderId: process.env.SMS_API_SENDER_ID || 'KSVAYR',
    templateId: process.env.SMS_API_TEMPLATE_ID || '1707176417936482061',
    entityId: process.env.SMS_API_ENTITY_ID || '1701176321009709060',
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
        throw new Error('Please enter a valid 10-digit phone number');
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Save to Database (Replace existing OTP for this phone if any)
    await OTP.deleteOne({ phone });
    await OTP.create({ phone, otp });

    // EXACT Message Format from PHP (DLT sensitive)
    const name = "Customer";
    const message = `Dear ${name}, your OTP for registration with KARAN SINGH VAIDH is ${otp}. Please use this code to complete your sign-up on www.thekaransinghvaidh.com\n-KARAN SINGH VAIDH`;

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
        console.log(`[OTP] Sending to ${phone}...`);

        const response = await fetch(SMS_API_CONFIG.url, {
            method: 'POST',
            body: params.toString(),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        const result = await response.text();
        console.log(`[OTP] API Response: ${result}`);

        res.status(200).json({
            success: true,
            message: 'OTP sent successfully',
        });
    } catch (error) {
        console.error('[OTP] Fetch Exception:', error.message);
        res.status(500);
        throw new Error('Network error while connecting to SMS provider');
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
        throw new Error('Missing phone or OTP');
    }

    const otpRecord = await OTP.findOne({ phone }).sort({ createdAt: -1 });

    if (!otpRecord) {
        res.status(400);
        throw new Error('OTP not found or expired. Request a new one.');
    }

    if (otpRecord.otp !== otp) {
        res.status(400);
        throw new Error('Incorrect OTP');
    }

    // Success - clean up
    await OTP.deleteOne({ _id: otpRecord._id });

    res.status(200).json({
        success: true,
        message: 'Verified'
    });
});


module.exports = { sendOTP, verifyOTP };
