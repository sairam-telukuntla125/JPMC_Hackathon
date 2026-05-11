const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
{
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    role: {
        type: String,
        enum: ['admin', 'volunteer', 'student'],
        required: true
    },

    skills: {
        type: [String],
        default: []
    },

    organization: {
        type: String,
        default: ''
    },

    isApproved: {
        type: Boolean,
        default: true
    },

    profileImage: {
        type: String,
        default: ''
    },

    // Student Details
    department: {         //added by sr
        type: String,
        default: ''
    },

    year: {                //added by sr
        type: String,
        default: ''
    }

},
{
    timestamps: true
}
);

module.exports = mongoose.model('User', userSchema);