const express = require('express');

const router = express.Router();

const {
    getDashboardStats,
    getTopVolunteers
} = require('../controllers/dashboardController');

const {
    protect,
    adminOnly
} = require('../middleware/authMiddleware');



// DASHBOARD STATS
router.get(
    '/stats',
    protect,
    adminOnly,
    getDashboardStats
);



// TOP VOLUNTEERS
router.get(
    '/top-volunteers',
    protect,
    adminOnly,
    getTopVolunteers
);



module.exports = router;