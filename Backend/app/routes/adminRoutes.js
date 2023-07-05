const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const passport = require('../../auth/passport')
const clientRoutes = require('./clientRoutes');
require('dotenv').config();



// Sign up a new admin
router.post('/signup', passport.authenticate('signupAdmin', { session: false }), async (req, res) => { adminController.signupAdmin(req, res) });

// Login
router.post('/login', async (req, res, next) => {
   passport.authenticate('loginAdmin', async (err, user, info) => {
      adminController.loginAdmin(req, res, next, err, user, info);
   })(req, res, next);
});


// From now on, we should authenticate with jwt each time there is a request to the server
router.use(passport.authenticate('jwt', { session: false }));


// Admin routes only for the admin model...
// Get all admins
// Get admin by ID
router.get('/:id', adminController.getAdminById);
// Edit admin by ID
// Delete admin by ID
// Get all users
// Get admin by ID
// Get user by ID
// Edit user by ID
// Delete user by ID
// Etc...

// Client routes
router.use('/:id/clients', clientRoutes);

module.exports = router;
