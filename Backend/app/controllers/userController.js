const User = require('../models/User');
const jwt = require('jsonwebtoken')


async function signupUser(req, res) {
   res.json({
      message: 'Signup successful. Welcome ' + req.user.username  + '!',
   });
}

async function loginUser(req, res, next, err, user, info) {
   try {
      if (err || !user) {
         console.log("err ----->", err);
         var myErrorMessage = info ? info.message : err;
         console.log("myErrorMeessage ----->", myErrorMessage);
         const error = new Error(myErrorMessage);
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
}

async function getUserById(req, res) {
   try {
      const userId = req.user._id;
      const user = await User.findById(userId, "-password").lean();
      if (!user) {  
         return res.status(404).json({ error: 'User not found' });
      }
      res.status(200).json(user);
   } catch (error) {
      console.error('Error when fetching user:', error);
      res.status(500).json({ error: 'Error when fetching user' });
   }
}


module.exports = { 
   getUserById,
   signupUser,
   loginUser,
};


// // Obtener todos los tickets
// const getAllTickets = async (req, res) => {
//   try {
//     const tickets = await Ticket.find();
//     res.status(200).json(tickets);
//   } catch (error) {
//     console.error('Error al obtener los tickets:', error);
//     res.status(500).json({ error: 'Error al obtener los tickets' });
//   }
// };

// // Obtener un ticket por su ID
// const getTicketById = async (req, res) => {
//   try {
//     const ticketId = req.params.id;
//     const ticket = await Ticket.findById(ticketId);
//     if (!ticket) {
//       return res.status(404).json({ error: 'Ticket no encontrado' });
//     }
//     res.status(200).json(ticket);
//   } catch (error) {
//     console.error('Error al obtener el ticket:', error);
//     res.status(500).json({ error: 'Error al obtener el ticket' });
//   }
// };

// // Actualizar un ticket por su ID
// const updateTicketById = async (req, res) => {
//   try {
//     const ticketId = req.params.id;
//     const { title, description, status } = req.body;
//     const updatedTicket = await Ticket.findByIdAndUpdate(
//       ticketId,
//       { title, description, status },
//       { new: true }
//     );
//     if (!updatedTicket) {
//       return res.status(404).json({ error: 'Ticket no encontrado' });
//     }
//     res.status(200).json(updatedTicket);
//   } catch (error) {
//     console.error('Error al actualizar el ticket:', error);
//     res.status(500).json({ error: 'Error al actualizar el ticket' });
//   }
// };

// // Eliminar un ticket por su ID
// const deleteTicketById = async (req, res) => {
//   try {
//     const ticketId = req.params.id;
//     const deletedTicket = await Ticket.findByIdAndDelete(ticketId);
//     if (!deletedTicket) {
//       return res.status(404).json({ error: 'Ticket no encontrado' });
//     }
//     res.status(200).json({ message: 'Ticket eliminado correctamente' });
//   } catch (error) {
//     console.error('Error al eliminar el ticket:', error);
//     res.status(500).json({ error: 'Error al eliminar el ticket' });
//   }
// };
