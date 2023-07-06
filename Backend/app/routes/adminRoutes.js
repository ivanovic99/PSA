const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const passport = require('../../auth/passport')
const { isAdmin } = require('../../auth/adminAuth')
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

router.use(isAdmin);

// Get all admins
router.get('/', adminController.getAllAdmins);

// Ger all users
router.get('/users', adminController.getAllUsers);

// Get admin by ID
router.get('/:id', adminController.getAdminById);

// Edit admin by ID
router.put('/:id', adminController.updateAdminById);

// Delete admin by ID
router.delete('/:id', adminController.deleteAdminById);



module.exports = router;
