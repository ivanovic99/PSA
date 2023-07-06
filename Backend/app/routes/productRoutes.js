const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { isAdmin } = require('../../auth/adminAuth');



// Get all products
router.get('/', productController.getAllProducts);

// Add new product
router.post('/', isAdmin, productController.addProduct);

// Get product by ID
router.get('/:id', productController.getProductById);

// Update product by ID
router.put('/:id', isAdmin, productController.updateProductById);

// Delete product by ID
router.delete('/:id', isAdmin, productController.deleteProductById);


module.exports = router;
