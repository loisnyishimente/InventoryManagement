const express = require('express');
const { signup, login, requestPasswordReset, resetPassword } = require('../controllers/authController');
const { check } = require('express-validator');

const router = express.Router();


router.post('/signup', [
    check('email', 'valid email').isEmail(),
    check('password', 'Password is required').not().isEmpty(),
], signup);


router.post('/login', login);


router.post('/request-password-reset', [
    check('email', 'Please include a valid email').isEmail(),
], requestPasswordReset);


router.post('/reset-password', resetPassword);

module.exports = router;
