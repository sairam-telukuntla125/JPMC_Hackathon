const express = require('express');

const router = express.Router();

const {
    registerForEvent,
    getMyRegistrations,
    markAttendance
} = require('../controllers/registrationController');

const {
    protect,
    adminOnly
} = require('../middleware/authMiddleware');



// REGISTER FOR EVENT
router.get(
    '/my-events',
    protect,
    getMyRegistrations
);
router.post(
    '/:eventId',
    protect,
    registerForEvent
);
router.put(
    '/attendance/:registrationId',
    protect,
    adminOnly,
    markAttendance
);



module.exports = router;