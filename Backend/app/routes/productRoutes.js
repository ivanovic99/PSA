const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const versionController = require('../controllers/versionController');
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

// ''''''''''''''   VERSIONS   '''''''''''''''''

// Get versions of product by ID
router.get('/:id/versions', versionController.getVersionsOfProductById);

// Add version to product by ID
router.post('/:id/versions', versionController.addVersionToProductById);

// Get version of product by ID
router.get('/:id/versions/:versionId', versionController.getVersionOfProductById);

// Edit version of product by ID
router.put('/:id/versions/:versionId', versionController.editVersionOfProductById);

// Delete version of product by ID
router.delete('/:id/versions/:versionId', versionController.deleteVersionOfProductById);


module.exports = router;
