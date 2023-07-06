const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');
const { isAdmin } = require('../../auth/adminAuth');

// Get all clients
router.get('/', clientController.getAllClients);

// Add new client
router.post('/', isAdmin, clientController.addClient);

// Get client by ID
router.get('/:id', clientController.getClientById);

// Update client by ID
router.put('/:id', isAdmin, clientController.updateClientById);

// Delete client by ID
router.delete('/:id', isAdmin, clientController.deleteClientById);


// '''''''''''''''''   PRODUCTS-VERSIONS   '''''''''''''''''

// Get products (versions) of client by ID
router.get('/:id/products', clientController.getProductsOfClientById);

// Add product (version) to client by ID
router.post('/:id/products/:versionId', clientController.addProductToClientById);

// Get product (version) of client by ID
router.get('/:id/products/:versionId', clientController.getProductOfClientById);

// Edit product (version) of client by ID
router.put('/:id/products/:versionId', clientController.editProductOfClientById);

// Delete product (version) of client by ID
router.delete('/:id/products/:versionId', clientController.deleteProductOfClientById);


// '''''''''''''''''   TICKETS   '''''''''''''''''


module.exports = router;
