const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema(

{
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
        required: true
    },

    role: {
        type: String,
        enum: ['student', 'volunteer'],
        required: true
    },

    attendanceMarked: {
        type: Boolean,
        default: false
    },

    volunteerHours: {
        type: Number,
        default: 0
    },

    certificateIssued: {
        type: Boolean,
        default: false
    },

    feedbackSubmitted: {
        type: Boolean,
        default: false
    },

    registrationStatus: {
        type: String,
        enum: ['registered', 'cancelled', 'completed'],
        default: 'registered'
    },
    attendance: {
        type: Boolean,
        default: false
    }

},

{
    timestamps: true
}

);

module.exports = mongoose.model(
    'Registration',
    registrationSchema
);