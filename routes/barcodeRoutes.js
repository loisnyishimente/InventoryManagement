const express = require('express');
const { generateProductQRCode } = require('../controllers/barcodeController');
const router = express.Router();

router.post('/generate', generateProductQRCode); 

module.exports = router;
