//added by sr

const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema(

{
    title: {
        type: String,
        required: true,
        trim: true
    },

    description: {
        type: String,
        required: true
    },

    category: {
        type: String,
        enum: [
            'workshop',
            'mock interview',
            'hackathon',
            'guest lecture',
            'mentorship'
        ],
        required: true
    },

    date: {
        type: Date,
        required: true
    },

    time: {
        type: String,
        required: true
    },

    duration: {
        type: Number,
        required: true
    },

    location: {
        type: String,
        required: true
    },

    capacity: {
        type: Number,
        required: true
    },

    requiredSkills: {
        type: [String],
        default: []
    },

    volunteersNeeded: {
        type: Number,
        default: 0
    },

    organizer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    status: {
        type: String,
        enum: ['upcoming', 'completed', 'cancelled'],
        default: 'upcoming'
    },

    qrCode: {
        type: String,
        default: ''
    },

    eventImage: {
        type: String,
        default: ''
    }

},

{
    timestamps: true
}

);

module.exports = mongoose.model('Event', eventSchema);