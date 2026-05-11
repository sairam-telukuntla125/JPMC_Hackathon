const Assignment =
    require('../models/Assignment');

const User =
    require('../models/User');

const Event =
    require('../models/Event');

const sendEmail =
    require('../utils/sendEmail');
const Registration = require('../models/Registration');


// ASSIGN VOLUNTEER
exports.assignVolunteer = async (req, res) => {

    try {

        const {
            volunteerId,
            eventId,
            studentIds
        } = req.body;



        // Check volunteer exists
        const volunteer =
            await User.findById(volunteerId);




        if (
            !volunteer ||
            volunteer.role !== 'volunteer'
        ) {

            return res.status(400).json({
                message: 'Invalid volunteer'
            });

        }



        // Check event exists
        const event =
            await Event.findById(eventId);




        if (!event) {

            return res.status(404).json({
                message: 'Event not found'
            });

        }



        // Create assignment
        const assignment =
            await Assignment.create({

                volunteer: volunteerId,

                event: eventId,

                assignedStudents: studentIds,

                assignedBy: req.user._id

            });
            // Send email to volunteer
                await sendEmail(

                    volunteer.email,

                    'Volunteer Assignment',

                    `You have been assigned to event:
                ${event.title}`

                );



        res.status(201).json({

            message:
                'Volunteer assigned successfully',

            assignment

        });

    }

    catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

exports.getVolunteerAssignments =
    async (req, res) => {

    try {

        const assignments =
            await Assignment.find({

                volunteer: req.user._id

            })

            .populate(
                'event',
                'title date location'
            )

            .populate(
                'assignedStudents',
                'name email'
            )

            .sort({ createdAt: -1 });




        res.status(200).json({

            count: assignments.length,

            assignments

        });

    }

    catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

exports.getMyMentors=async(req,res)=>{
    try{
        const assignments = await Assignment.find({
            assignedStudents:req.user._id
        })
        .populate(
            'volunteer',
            'name email'
        )
        .populate(
            'event',
            'title date location'
        );

        res.status(200).json({
            count:assignments.length,
            assignments

        });
    }
    catch(error){
        res.status(500).json({
            message:error.message
        });
    }
};

exports.getEventStudents=async(req,res)=>{
    try{

        const eventId = req.params.eventId;

        const students = await Registration.find({
            event:eventId
        })
        .populate(
            'user',
            'name email'
        );

        res.status(200).json({
            count:students.length,
            students
        });
    }
    catch(error){
        res.status(500).json({
            message:error.message
        });
    }
};

exports.getEventStats= async(req,res)=>{
    try{

        const eventId = req.params.eventId;

        const totalRegistered = await Registration.countDocuments({
            event:eventId
        });

        const attendanceMarked = await Registration.countDocuments({
            event:eventId,
            attendanceMarked:true
        });

        const pendingAttendence = totalRegistered-attendanceMarked;

        res.status(200).json({
            totalRegistered,
            attendanceMarked,
            pendingAttendence
        });
    }
    catch(error){
        res.status(500).json({
            message:error.message
        });
    }
};