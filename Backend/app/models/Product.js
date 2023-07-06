const mongoose = require('mongoose');
const Version = require('./Version');

var options = { collection: 'Products' };

const ProductSchema = new mongoose.Schema({

   name: { type: String, required: true },

   description: { type: String, required: true },

   createdAt: { type: Date, default: Date.now },

   updatedAt: { type: Date, default: Date.now },

   versions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Version' }],

}, options);

ProductSchema.methods.addVersion = async function (customization) {
   try {
      const version = await Version.create({ customization });
      version.save();
      this.versions.push(version);
      await this.save();
      return this;
   } catch(error) {
      console.log(error);
   }
}

ProductSchema.pre("findByIdAndDelete", async function (next) {
   try {
      this.versions.forEach(async (version) => {
         await Version.findByIdAndDelete(version._id);
      });
      next();
   } catch(error) {
      console.log(error);
      throw new Error(error);
   }
});

module.exports = mongoose.model('Product', ProductSchema);
