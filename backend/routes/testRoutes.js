const express = require('express');

const router = express.Router();

const {
    protect,
    adminOnly
} = require('../middleware/authMiddleware');



// PROTECTED ROUTE
router.get('/protected', protect, (req, res) => {

    res.json({
        message: 'Protected route accessed',
        user: req.user
    });

});



// ADMIN ROUTE
router.get('/admin', protect, adminOnly, (req, res) => {

    res.json({
        message: 'Welcome Admin'
    });

});



module.exports = router;