const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const passport = require('../../auth/passport')
const jwt = require('jsonwebtoken')
require('dotenv').config();


// This two routes (signup and login) should probably be in a different file

// Sign up a new user
router.post('/signup', passport.authenticate('signup', { session: false }), async (req, res) => {
   res.json({
      message: 'Signup successful ' + req.user.password,
      user: req.user
   });
   // res.send("ok");
});

// Login
router.post('/login', async (req, res, next) => {
   passport.authenticate('login', async (err, user, info) => {
      try {
         if (err || !user) {
            console.log(err);
            console.log(info.message);
            const error = new Error(info.message);
            return next(error);
         }
         req.login(user, { session: false }, async (error) => {
            if (error) return next(error)
            const body = { _id: user._id, email: user.email, username: user.username };
            const token = jwt.sign({ user: body }, process.env.JWT_SECRET);
            return res.json({ token });
         });
      } catch (error) {
         return next(error);
      }
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
