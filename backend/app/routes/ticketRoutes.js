const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticketController');


// Ruta para crear un ticket
router.post('/', async (req, res) => {
  try {
    const { title, description, status } = req.body;
    const ticketData = { title, description, status };
    const createdTicket = await ticketController.createTicket(ticketData);
    res.status(201).json(createdTicket);
  } catch (error) {
    console.error('Error al crear el ticket:', error);
    res.status(500).json({ error: 'Error al crear el ticket' });
  }
});

// Ruta para obtener todos los tickets
router.get('/', ticketController.getAllTickets);

// Ruta para obtener un ticket por su ID
router.get('/:id', ticketController.getTicketById);

// Ruta para actualizar un ticket por su ID
router.put('/:id', ticketController.updateTicketById);

// Ruta para eliminar un ticket por su ID
router.delete('/:id', ticketController.deleteTicketById);


module.exports = router;
