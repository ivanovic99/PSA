const Product = require('../models/Product');
const Version = require('../models/Version');

// Get all versions of a product by ID
async function getVersionsOfProductById(req, res) {
   try {
      const product = await Product.findById(req.params.id).populate('versions');
      if (!product) {
         return res.status(404).json({ message: 'Product not found' });
      }
      res.status(200).json(product.versions);
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
}

// Add version to product by ID
async function addVersionToProductById(req, res) {
   try {
      const product = await Product.findById(req.params.id);
      if (!product) {
         return res.status(404).json({ message: 'Product not found' });
      }
      const { versionNumber, customization } = req.body;
      const updatedProduct = await product.addVersion(versionNumber, customization);
      res.status(200).json(await updatedProduct.populate("versions"));
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
}

// Get version of product by ID
async function getVersionOfProductById(req, res) {
   try {
      const { id, versionId } = req.params;
      const product = await Product.findById(id);
      if (!product) {
         return res.status(404).json({ message: 'Product not found' });
      }
      if (!product.versions.includes(versionId)) {
         return res.status(404).json({ message: 'Version not found' });
      }
      const version = await Version.findById(versionId);
      if (!version) {
         return res.status(404).json({ message: 'Version not found' });
      }
      res.status(200).json(version);
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
}

// Edit version of product by ID
async function editVersionOfProductById(req, res) {
   try {
      const { id, versionId } = req.params;
      const product = await Product.findById(id);
      if (!product) {
         return res.status(404).json({ message: 'Product not found' });
      }
      if (!product.versions.includes(versionId)) {
         return res.status(404).json({ message: 'Version not found' });
      }
      const { versionNumber, customization } = req.body;
      const version = await Version.findByIdAndUpdate(versionId, { versionNumber, customization }, { new: true });
      if (!version) {
         return res.status(404).json({ message: 'Version not found' });
      }
      res.status(200).json(version);
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
}

// Delete version of product by ID
async function deleteVersionOfProductById(req, res) {
   const { id, versionId } = req.params;
   try {
      const product = await Product.findById(id);
      if (!product) {
         return res.status(404).json({ message: 'Product not found' });
      }
      if (!product.versions.includes(versionId)) {
         return res.status(404).json({ message: 'Version not found' });
      }
      const updatedProduct = await product.removeVersion(versionId);
      res.status(200).json(await updatedProduct.populate("versions"));
   }
   catch (error) {
      res.status(500).json({ message: error.message });
   }
}

module.exports = {
   getVersionsOfProductById,
   addVersionToProductById,
   getVersionOfProductById,
   editVersionOfProductById,
   deleteVersionOfProductById
}


