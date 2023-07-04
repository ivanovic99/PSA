const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const passport = require('../../auth/passport')
const jwt = require('jsonwebtoken')
require('dotenv').config();


// Sign up a new user
router.post('/signup', passport.authenticate('signupUser', { session: false }), userController.signupUser);

// Login
router.post('/login', async (req, res, next) => {
   passport.authenticate('loginUser', async (err, user, info) => {
      userController.loginUser(req, res, next, err, user, info);
   })(req, res, next);
});


// Get user by ID
router.get('/:id', passport.authenticate('jwt', { session: false }), userController.getUserById);

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
