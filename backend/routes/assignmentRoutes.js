const express = require('express');

const router = express.Router();

const {
    assignVolunteer,
    getVolunteerAssignments,
    getMyMentors,
    getEventStudents,
    getEventStats
} = require('../controllers/assignmentController');

const {
    protect,
    adminOnly,
    volunteerOnly,
    studentOnly
} = require('../middleware/authMiddleware');



// ADMIN ASSIGNMENT
router.post(
    '/',
    protect,
    adminOnly,
    assignVolunteer
);



// VOLUNTEER DASHBOARD
router.get(
    '/my-assignments',
    protect,
    volunteerOnly,
    getVolunteerAssignments
);

router.get(
    '/my-mentors',
    protect,
    studentOnly,
    getMyMentors
);

router.get(
    '/event-students/:eventId',
    protect,
    volunteerOnly,
    getEventStudents
);

router.get(
    '/event-stats/:eventId',
    protect,
    volunteerOnly,
    getEventStats
);




module.exports = router;