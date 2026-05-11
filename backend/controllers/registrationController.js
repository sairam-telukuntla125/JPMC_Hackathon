const Registration = require('../models/Registration');

const Event = require('../models/Event');
const sendEmail =
    require('../utils/sendEmail');

const User =
    require('../models/User');



// REGISTER FOR EVENT
exports.registerForEvent = async (req, res) => {

    try {

        const eventId = req.params.eventId;



        // Find event
        const event = await Event.findById(eventId);

        if (!event) {

            return res.status(404).json({
                message: 'Event not found'
            });

        }



        // Check duplicate registration
        const existingRegistration =
            await Registration.findOne({

                user: req.user._id,
                event: eventId

            });




        if (existingRegistration) {

            return res.status(400).json({
                message: 'Already registered'
            });

        }



        // Create registration
        const registration =
            await Registration.create({

                user: req.user._id,

                event: eventId,

                role: req.user.role

            });
                        // Find current user
            const user =
                await User.findById(req.user._id);



            // Send confirmation email
            await sendEmail(

                user.email,

                'Event Registration Successful',

                `Hello ${user.name},

            You have successfully registered for:

            Event: ${event.title}

            Category: ${event.category}

            Location: ${event.location}

            Time: ${event.time}

            Thank you for participating in ImpactBridge.
            `

            );



        res.status(201).json({

            message: 'Registered successfully',

            registration

        });

    }

    catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

exports.getMyRegistrations = async(req,res)=>{
    try{
        const registrations = await Registration.find({
            user:req.user._id
        })
        .populate('event')
        .sort({createdAt:-1});

        res.status(200).json({
            count:registrations.length,
            registrations
        });
    }
    catch(error){
        res.status(500).json({
            message:error.message
        });
    }
};

exports.markAttendance = async (req, res) => {

    try {

        const registrationId = req.params.registrationId;

        const { volunteerHours } = req.body;



        // Find registration
        const registration =
            await Registration.findById(registrationId);




        if (!registration) {

            return res.status(404).json({
                message: 'Registration not found'
            });

        }



        // Mark attendance
        registration.attendanceMarked = true;

        // Add volunteer hours
        if (registration.role === 'volunteer') {

            registration.volunteerHours =
                volunteerHours || 0;

        }

        await registration.save();

        res.status(200).json({

            message: 'Attendance marked successfully',

            registration

        });

    }

    catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};