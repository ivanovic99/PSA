const Product = require('../models/Product');

// Get all products
async function getAllProducts(req, res) {
   try {
      const products = await Product.find().populate('versions');
      res.json(products);
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
}

// Add new product
async function addProduct(req, res) {
   try {
      const { name, description, customization } = req.body;
      const product = await Product.create({ name, description });
      const updatedProduct = await product.addVersion("1.0.0", customization);
      res.status(201).json({ newProduct: updatedProduct });
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
}

// Get product by ID
async function getProductById(req, res) {
   try {
      const { id } = req.params;
      if (!id.match(/^[0-9a-fA-F]{24}$/)) {
         console.log("Invalid ID for product");
         return res.json({ message: "Product not found" });
     }
      const product = await Product.findById(id).populate('versions');
      if (!product) {
         return res.status(404).json({ message: 'Product not found!' });
      }
      res.json(product);
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
}

// Update product by ID
async function updateProductById(req, res) {
   try {
      const { id } = req.params;
      const { name, description } = req.body;
      const product = await Product.findByIdAndUpdate(id, { name, description }, { new: true }).populate('versions');
      if (!product) {
         return res.status(404).json({ message: 'Product not found!' });
      }
      res.json(product);
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
}

// Delete product by ID
async function deleteProductById(req, res) {
   try {
      const { id } = req.params;
      const product = await Product.findByIdAndDelete(id);
      if (!product) {
         return res.status(404).json({ message: 'Product not found!' });
      }
      res.json(product);
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
}

module.exports = {
   getAllProducts,
   addProduct,
   getProductById,
   updateProductById,
   deleteProductById,
}

