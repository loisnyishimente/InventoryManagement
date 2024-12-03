const express = require('express');
const router = express.Router();
const roleMiddleware = require('../middleware/roleMiddleware');
const userController = require('../controllers/userController');

// Protect routes for Admin only
router.get('/admin-dashboard', roleMiddleware(['Admin']), userController.adminDashboard);

module.exports = router;
