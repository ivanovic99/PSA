const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const passport = require('../../auth/passport')
const jwt = require('jsonwebtoken')
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

// Get admin by ID
router.get('/:id', adminController.getAdminById);

// // Get all users
// router.get('/', userController.getAllUsers);

// // Ruta para obtener todos los tickets
// router.get('/', ticketController.getAllTickets);

// // Ruta para obtener un ticket por su ID
// router.get('/:id', ticketController.getTicketById);

// // Ruta para actualizar un ticket por su ID
// router.put('/:id', ticketController.updateTicketById);

// // Ruta para eliminar un ticket por su ID
// router.delete('/:id', ticketController.deleteTicketById);


module.exports = router;
