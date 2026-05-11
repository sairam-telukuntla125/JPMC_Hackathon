const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sendEmail = require('../utils/sendEmail');



// Generate JWT Token
const generateToken = (id, role) => {

    return jwt.sign(
        { id, role },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
    );

};




// REGISTER USER
exports.registerUser = async (req, res) => {

    try {

        const {
            name,
            email,
            password,
            role,
            skills,
            organization
        } = req.body;



        // Check existing user
        const existingUser = await User.findOne({ email });

        if (existingUser) {

            return res.status(400).json({
                message: 'User already exists'
            });

        }



        // Hash password
        const salt = await bcrypt.genSalt(10);

        const hashedPassword = await bcrypt.hash(password, salt);



        // Create user
        const user = await User.create({

            name,
            email,
            password: hashedPassword,
            role,
            skills,
            organization

        });
        await sendEmail(

                user.email,

                'Welcome to ImpactBridge ',

                `Hello ${user.name},

            Your account has been created successfully.

            Role: ${user.role}

            You can now login and explore events and opportunities.

            Team ImpactBridge `

            );



        // Response
        res.status(201).json({

            message: 'User registered successfully',

            token: generateToken(user._id, user.role),

            user

        });



    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};






// LOGIN USER
exports.loginUser = async (req, res) => {

    try {

        const { email, password } = req.body;



        // Check user exists
        const user = await User.findOne({ email });

        if (!user) {

            return res.status(400).json({
                message: 'Invalid credentials'
            });

        }



        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {

            return res.status(400).json({
                message: 'Invalid credentials'
            });

        }



        // Response
        res.status(200).json({

            message: 'Login successful',

            token: generateToken(user._id, user.role),

            user

        });


    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};