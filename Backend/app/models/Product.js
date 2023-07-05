const mongoose = require('mongoose');

var options = { collection: 'Products' };

const ProductSchema = new mongoose.Schema({

   name: { type: String, required: true, unique },

   description: { type: String, required: true },

   createdAt: { type: Date, default: Date.now },

   updatedAt: { type: Date, default: Date.now },

   versions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Version' }],

}, options);

module.exports = mongoose.model('Product', ProductSchema);
