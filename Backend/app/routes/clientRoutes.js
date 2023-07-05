const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');


// Get all clients
router.get('/', clientController.getAllClients);

// Add new client
router.post('/addClient', clientController.addClient);

// Get client by ID
router.get('/:id', clientController.getClientById);

// Update client by ID
router.put('/:id', clientController.updateClientById);

// Delete client by ID
router.delete('/:id', clientController.deleteClientById);

// Products of each client, tickets, etc...

module.exports = router;
