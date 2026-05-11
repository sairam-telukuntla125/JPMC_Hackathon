const Event = require('../models/Event');



// CREATE EVENT
exports.createEvent = async (req, res) => {

    try {

        const {
            title,
            description,
            category,
            date,
            time,
            duration,
            location,
            capacity,
            requiredSkills,
            volunteersNeeded
        } = req.body;



        const event = await Event.create({

            title,
            description,
            category,
            date,
            time,
            duration,
            location,
            capacity,
            requiredSkills,
            volunteersNeeded,

            organizer: req.user._id

        });



        res.status(201).json({

            message: 'Event created successfully',

            event

        });

    }

    catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

exports.getAllEvents = async (req, res) => {

    try {

        const events = await Event.find()

            // Populate organizer details
            .populate(
                'organizer',
                'name email organization'
            )

            // Latest events first
            .sort({ createdAt: -1 });



        res.status(200).json({

            count: events.length,

            events

        });

    }

    catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

exports.updateEvent = async (req, res) => {

    try {

        const eventId = req.params.id;



        // Find event
        const event =
            await Event.findById(eventId);




        if (!event) {

            return res.status(404).json({

                message: 'Event not found'

            });

        }




        // Update event
        const updatedEvent =
            await Event.findByIdAndUpdate(

                eventId,

                req.body,

                {
                    new: true,
                    runValidators: true
                }

            );




        res.status(200).json({

            message: 'Event updated successfully',

            updatedEvent

        });

    }

    catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};

exports.deleteEvent = async (req, res) => {

    try {

        const eventId = req.params.id;



        // Find event
        const event =
            await Event.findById(eventId);




        if (!event) {

            return res.status(404).json({

                message: 'Event not found'

            });

        }




        // Delete event
        await Event.findByIdAndDelete(eventId);




        res.status(200).json({

            message: 'Event deleted successfully'

        });

    }

    catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};