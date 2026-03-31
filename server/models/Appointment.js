const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide your name'],
        trim: true
    },
    phone: {
        type: String,
        required: [true, 'Please provide your phone number'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Please provide your email address'],
        trim: true,
        lowercase: true
    },
    service: {
        type: String,
        required: [true, 'Please provide the service required'],
        trim: true
    },
    concern: {
        type: String,
        trim: true
    },
    preferredDate: {
        type: Date
    },
    preferredTime: {
        type: String
    },
    duration: {
        type: String,
        enum: ['15 Min', '30 Min', '45 Min'],
        default: '15 Min'
    },
    status: {
        type: String,
        enum: ['Pending', 'Confirmed', 'Completed', 'Cancelled'],
        default: 'Pending'
    },
    paymentStatus: {
        type: String,
        enum: ['Pending', 'Completed', 'Failed'],
        default: 'Completed'
    },
    paymentId: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Appointment', appointmentSchema);
