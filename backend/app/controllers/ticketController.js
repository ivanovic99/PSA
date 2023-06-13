const Ticket = require('../models/Ticket');

async function createTicket(ticketData) {
  try {
    const ticket = new Ticket(ticketData);
    const savedTicket = await ticket.save({ bufferTimeout: 30000 }) // Aumentar el tiempo de espera a 30 segundos
    console.log('Ticket guardado:', savedTicket);
    return savedTicket;
  } catch (error) {
    console.error('Error al guardar el ticket:', error);
    throw error;
  }
}

// Obtener todos los tickets
const getAllTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find();
    res.status(200).json(tickets);
  } catch (error) {
    console.error('Error al obtener los tickets:', error);
    res.status(500).json({ error: 'Error al obtener los tickets' });
  }
};

// Obtener un ticket por su ID
const getTicketById = async (req, res) => {
  try {
    const ticketId = req.params.id;
    const ticket = await Ticket.findById(ticketId);
    if (!ticket) {
      return res.status(404).json({ error: 'Ticket no encontrado' });
    }
    res.status(200).json(ticket);
  } catch (error) {
    console.error('Error al obtener el ticket:', error);
    res.status(500).json({ error: 'Error al obtener el ticket' });
  }
};

// Actualizar un ticket por su ID
const updateTicketById = async (req, res) => {
  try {
    const ticketId = req.params.id;
    const { title, description, status } = req.body;
    const updatedTicket = await Ticket.findByIdAndUpdate(
      ticketId,
      { title, description, status },
      { new: true }
    );
    if (!updatedTicket) {
      return res.status(404).json({ error: 'Ticket no encontrado' });
    }
    res.status(200).json(updatedTicket);
  } catch (error) {
    console.error('Error al actualizar el ticket:', error);
    res.status(500).json({ error: 'Error al actualizar el ticket' });
  }
};

// Eliminar un ticket por su ID
const deleteTicketById = async (req, res) => {
  try {
    const ticketId = req.params.id;
    const deletedTicket = await Ticket.findByIdAndDelete(ticketId);
    if (!deletedTicket) {
      return res.status(404).json({ error: 'Ticket no encontrado' });
    }
    res.status(200).json({ message: 'Ticket eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar el ticket:', error);
    res.status(500).json({ error: 'Error al eliminar el ticket' });
  }
};

module.exports = { 
  createTicket,
  getAllTickets,
  getTicketById,
  updateTicketById,
  deleteTicketById,
};
