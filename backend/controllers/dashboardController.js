const User = require('../models/User');

const Event = require('../models/Event');

const Registration = require('../models/Registration');



// DASHBOARD STATS
exports.getDashboardStats = async (req, res) => {

    try {

        // Total users
        const totalStudents =
            await User.countDocuments({
                role: 'student'
            });


        const totalVolunteers =
            await User.countDocuments({
                role: 'volunteer'
            });


        // Total events
        const totalEvents =
            await Event.countDocuments();


        // Total registrations
        const totalRegistrations =
            await Registration.countDocuments();


        // Attendance count
        const attendanceCount =
            await Registration.countDocuments({
                attendanceMarked: true
            });


        // Total volunteer hours
        const volunteerHoursData =
            await Registration.find({
                role: 'volunteer'
            });


        let totalVolunteerHours = 0;

        volunteerHoursData.forEach((item) => {

            totalVolunteerHours += item.volunteerHours;

        });




        res.status(200).json({

            totalStudents,

            totalVolunteers,

            totalEvents,

            totalRegistrations,

            attendanceCount,

            totalVolunteerHours

        });

    }

    catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

exports.getTopVolunteers = async (req, res) => {

    try {

        const topVolunteers =
            await Registration.find({
                role: 'volunteer'
            })

            .populate(
                'user',
                'name email organization'
            )

            .sort({ volunteerHours: -1 })

            .limit(5);




        res.status(200).json({

            topVolunteers

        });

    }

    catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};