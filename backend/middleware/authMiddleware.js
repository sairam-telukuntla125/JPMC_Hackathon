const jwt = require('jsonwebtoken');
const User = require('../models/User');



const protect = async (req, res, next) => {

    let token;

    try {

        // Check token exists
        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith('Bearer')
        ) {

            token = req.headers.authorization.split(' ')[1];

            // Verify token
            const decoded = jwt.verify(
                token,
                process.env.JWT_SECRET
            );

            // Get user
            req.user = await User.findById(decoded.id).select('-password');

            next();

        } else {

            return res.status(401).json({
                message: 'Not authorized, no token'
            });

        }

    } catch (error) {

        return res.status(401).json({
            message: 'Token failed'
        });

    }

};




const adminOnly = (req, res, next) => {

    if (req.user && req.user.role === 'admin') {

        next();

    } else {

        return res.status(403).json({
            message: 'Admin access only'
        });

    }

};

// VOLUNTEER ONLY
const volunteerOnly = (req, res, next) => {

    if (
        req.user &&
        req.user.role === 'volunteer'
    ) {

        next();

    }

    else {

        return res.status(403).json({

            message: 'Volunteer access only'

        });

    }

};




// STUDENT ONLY
const studentOnly = (req, res, next) => {

    if (
        req.user &&
        req.user.role === 'student'
    ) {

        next();

    }

    else {

        return res.status(403).json({

            message: 'Student access only'

        });

    }

};



module.exports = {
    protect,
    adminOnly,
    volunteerOnly,
    studentOnly
};