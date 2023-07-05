const mongoose = require('mongoose');

var options = { collection: 'Clients' };

const ClientSchema = new mongoose.Schema({

   CUIL: { type: Number, required: true, unique: true },
   
   name: { type: String, required: true },
   
   email: { type: String, required: true, unique: true },
   
   phone: [{ type: Number, required: true }],
   
   createdAt: { type: Date, default: Date.now },
   
   updatedAt: { type: Date, default: Date.now },

   country: { type: String, required: true },
   
   city: { type: String, required: true },

   address: { type: String, required: true },

   productsVersion: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Version' }],

   // add tickets association
   
}, options);


module.exports = mongoose.model('Client', ClientSchema);
