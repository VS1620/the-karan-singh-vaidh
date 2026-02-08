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
        trim: true,
        lowercase: true
    },
    concern: {
        type: String,
        required: [true, 'Please provide your health concern'],
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
