const express = require('express');

const router = express.Router();

const {
    createEvent,
    getAllEvents,
    updateEvent,
    deleteEvent
} = require('../controllers/eventController');

const {
    protect,
    adminOnly
} = require('../middleware/authMiddleware');


router.get('/', getAllEvents);
// CREATE EVENT
router.post(
    '/',
    protect,
    adminOnly,
    createEvent
);
// UPDATE EVENT
router.put(
    '/:id',
    protect,
    adminOnly,
    updateEvent
);

// DELETE EVENT
router.delete(
    '/:id',
    protect,
    adminOnly,
    deleteEvent
);



module.exports = router;