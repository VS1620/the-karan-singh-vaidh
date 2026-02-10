const mongoose = require('mongoose');

const otpSchema = mongoose.Schema({
    phone: {
        type: String,
        required: true,
        index: true,
    },
    otp: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 300, // 5 minutes (300 seconds)
    }
}, {
    timestamps: true,
});

// Ensure indexes are created, especially for the TTL index
const OTP = mongoose.model('OTP', otpSchema);

module.exports = OTP;
