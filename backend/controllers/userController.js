const User = require('../models/User');



// GET CURRENT USER
exports.getMyProfile = async (req, res) => {

    try {

        const user =
            await User.findById(req.user._id)
            .select('-password');




        res.status(200).json(user);

    }

    catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};




// UPDATE PROFILE
exports.updateMyProfile = async (req, res) => {

    try {

        const updatedUser =
            await User.findByIdAndUpdate(

                req.user._id,

                req.body,

                {
                    new: true,
                    runValidators: true
                }

            ).select('-password');




        res.status(200).json({

            message: 'Profile updated successfully',

            updatedUser

        });

    }

    catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};




// DELETE OWN ACCOUNT
exports.deleteMyAccount = async (req, res) => {

    try {

        await User.findByIdAndDelete(
            req.user._id
        );




        res.status(200).json({

            message:
                'Account deleted successfully'

        });

    }

    catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};




// ADMIN - GET ALL USERS
exports.getAllUsers = async (req, res) => {

    try {

        const users =
            await User.find()
            .select('-password');




        res.status(200).json({

            count: users.length,

            users

        });

    }

    catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};




// ADMIN - DELETE USER
exports.deleteUser = async (req, res) => {

    try {

        const user =
            await User.findById(req.params.id);




        if (!user) {

            return res.status(404).json({

                message: 'User not found'

            });

        }




        await User.findByIdAndDelete(
            req.params.id
        );




        res.status(200).json({

            message: 'User deleted successfully'

        });

    }

    catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};