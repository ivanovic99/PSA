const mongoose = require("mongoose");

var options = { collection: "Versions" };

const VersionSchema = new mongoose.Schema({

   versionNumber: { type: String, default: "1.0.0", required: true },
   
   customization: { type: String, required: true },
   
   createdAt: { type: Date, default: Date.now },
   
   updatedAt: { type: Date, default: Date.now },
   
   product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },

   clients: [{ type: mongoose.Schema.Types.ObjectId, ref: "Client" }],

}, options);

module.exports = mongoose.model("Version", VersionSchema);