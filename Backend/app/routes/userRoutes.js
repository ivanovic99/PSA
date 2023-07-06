const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const passport = require('../../auth/passport');
require('dotenv').config();


// Sign up a new user
router.post('/signup', passport.authenticate('signupUser', { session: false }), userController.signupUser);

// Login
router.post('/login', async (req, res, next) => {
   passport.authenticate('loginUser', async (err, user, info) => {
      userController.loginUser(req, res, next, err, user, info);
   })(req, res, next);
});

// From now on, we should authenticate with jwt each time there is a request to the server
router.use(passport.authenticate('jwt', { session: false }));

// Get user by ID
router.get('/:id', userController.getUserById);

// Update user by ID
router.put('/:id', userController.updateUserById);

// Delete user by ID
router.delete('/:id', userController.deleteUserById);



module.exports = router;
