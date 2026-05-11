const express = require('express');

const router = express.Router();

const {

    getMyProfile,

    updateMyProfile,

    deleteMyAccount,

    getAllUsers,

    deleteUser

} = require('../controllers/userController');



const {

    protect,

    adminOnly

} = require('../middleware/authMiddleware');




// SELF ROUTES
router.get(
    '/me',
    protect,
    getMyProfile
);

router.put(
    '/me',
    protect,
    updateMyProfile
);

router.delete(
    '/me',
    protect,
    deleteMyAccount
);




// ADMIN ROUTES
router.get(
    '/',
    protect,
    adminOnly,
    getAllUsers
);

router.delete(
    '/:id',
    protect,
    adminOnly,
    deleteUser
);



module.exports = router;