const asyncHandler = require('express-async-handler');
const mongoose = require('mongoose');
const generateToken = require('../utils/generateToken');
const User = require('../models/User');

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
    console.log('--- LOGIN ATTEMPT ---');
    if (mongoose.connection.readyState !== 1) {
        console.error('DB NOT CONNECTED');
        res.status(503);
        throw new Error('Database not connected. Please start MongoDB.');
    }
    const { email, password } = req.body;
    console.log(`Email: ${email}`);

    try {
        const user = await User.findOne({ email });
        console.log(`User found: ${user ? 'YES' : 'NO'}`);

        if (user) {
            console.log(`Stored Hash: ${user.password}`);
            const isMatch = await user.matchPassword(password);
            console.log(`Password Match: ${isMatch}`);

            if (isMatch) {
                console.log('Login Successful, generating token...');
                res.json({
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    isAdmin: user.isAdmin,
                    token: generateToken(user._id),
                });
            } else {
                console.warn('Password mismatch');
                res.status(401);
                throw new Error('Invalid email or password');
            }
        } else {
            console.warn('User not found');
            res.status(401);
            throw new Error('Invalid email or password');
        }
    } catch (error) {
        console.error('ERROR IN LOGIN FLOW:', error);
        throw error;
    }
});

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }

    const user = await User.create({
        name,
        email,
        password,
    });

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
});

module.exports = { authUser, registerUser };
