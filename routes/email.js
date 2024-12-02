const express = require('express');
const { sendConfirmationEmail, sendVerificationEmail, verifyToken, forgotPassword, sendEmailController, changePassword } = require('../controllers/email');

const router = express.Router();


//router.post('/send-confirmation', sendConfirmationEmail);
//router.post('/send-token', sendVerificationEmail);
//router.post('/verify-token', verifyToken);
router.post('/forgot-password', forgotPassword);
router.put('/change-password', changePassword);
//router.post('/send', sendEmailController);

module.exports = router;