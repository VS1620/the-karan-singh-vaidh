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
    status: {
        type: String,
        enum: ['Pending', 'Confirmed', 'Completed', 'Cancelled'],
        default: 'Pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Appointment', appointmentSchema);
