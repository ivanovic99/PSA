const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');
const { isAdmin } = require('../../auth/adminAuth');

// Get all clients
router.get('/', clientController.getAllClients);

// Add new client
router.post('/addClient', isAdmin, clientController.addClient);

// Get client by ID
router.get('/:id', clientController.getClientById);

// Update client by ID
router.put('/:id', isAdmin, clientController.updateClientById);

// Delete client by ID
router.delete('/:id', isAdmin, clientController.deleteClientById);

// Products of each client, tickets, etc...

module.exports = router;
