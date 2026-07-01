const express = require('express');
const router = express.Router();
const { authUser, registerUser, resetPassword, getUsers } = require('../controllers/authController');
const { protect, admin } = require('../middleware/authMiddleware');

router.post('/login', authUser);
router.route('/').post(registerUser).get(protect, admin, getUsers);
router.post('/reset-password', resetPassword);

module.exports = router;
