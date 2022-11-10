const express= require('express');
const router= express.Router();


const {registerUser, loginUser,
     logout, getUserProfile, allUsers,
      updateProfile, updatePassword, addFriend, getUserFriend}= require('../controllers/usercontroller');
const { isAuthenticatedUser } = require('../middlewares/auth');
router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/logout').get(logout);
router.route('/me').get(isAuthenticatedUser, getUserProfile);
router.route('/myfriends').get(isAuthenticatedUser, getUserFriend);

router.route('/me/update').put(isAuthenticatedUser, updateProfile)
router.route('/addfriend/:id').put(isAuthenticatedUser, addFriend)

router.route('/password/update').put(isAuthenticatedUser,updatePassword);

router.route('/users').get(isAuthenticatedUser,allUsers);


 

module.exports= router;

