const express = require('express');
const router = express.Router();
const ReportController = require('../controllers/reportController');


router.get('/sales', ReportController.getSalesReport);
router.get('/stock-movement', ReportController.getStockMovementReport);

module.exports = router;
