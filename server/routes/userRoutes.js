const express = require('express');
const router = express.Router();
const { authUser, registerUser, resetPassword } = require('../controllers/authController');

router.post('/login', authUser);
router.route('/').post(registerUser);
router.post('/reset-password', resetPassword);

module.exports = router;
