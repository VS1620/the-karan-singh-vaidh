const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/User');

const protect = asyncHandler(async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            token = req.headers.authorization.split(' ')[1];
            console.log('--- AUTH PROTECTION CHECK ---');
            console.log('Token received');

            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log(`Token Decoded for ID: ${decoded.id}`);

            req.user = await User.findById(decoded.id).select('-password');
            console.log(`User Found: ${req.user ? req.user.email : 'NO'}`);
            console.log(`Is Admin: ${req.user ? req.user.isAdmin : 'N/A'}`);

            next();
        } catch (error) {
            console.error('AUTH ERROR:', error.message);
            res.status(401);
            throw new Error('Not authorized, token failed');
        }
    }

    if (!token) {
        console.warn('AUTH ERROR: No token provided');
        res.status(401);
        throw new Error('Not authorized, no token');
    }
});

const admin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        console.warn(`ADMIN ACCESS DENIED for: ${req.user ? req.user.email : 'Unknown'}`);
        res.status(401);
        throw new Error('Not authorized as an admin');
    }
};

module.exports = { protect, admin };
