const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema(

{
    volunteer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
        required: true
    },

    assignedStudents: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],

    assignedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }

},

{
    timestamps: true
}

);

module.exports = mongoose.model(
    'Assignment',
    assignmentSchema
);