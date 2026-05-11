const express = require("express");
const router = express.Router();

const Registration =
require("../models/Registration");
router.get(
"/attendance/:studentId",

async (req, res) => {

    try {

        const studentId =
        req.params.studentId;

        const registrations =
        await Registration.find({
            studentId
        });

        const totalEvents =
        registrations.length;

        const attendedEvents =
        registrations.filter(
            r => r.attendance
        ).length;

        const attendancePercentage =
        totalEvents > 0
        ? Math.round(
            (attendedEvents / totalEvents) * 100
          )
        : 0;

        const certificates =
        registrations.filter(
            r => r.certificateIssued
        ).length;

        const volunteerHours =
        registrations.reduce(

            (total, item) =>

            total + item.volunteerHours,

            0

        );

        res.json({

            totalEvents,

            attendedEvents,

            attendancePercentage,

            certificates,

            volunteerHours

        });

    }

    catch(err) {

        res.status(500).json(err);

    }

});

module.exports = router;