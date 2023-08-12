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

ProductSchema.methods.addVersion = async function (versionNumber, customization) {
   try {
      var product = this;
      const version = await Version.create({ versionNumber, customization, product: product._id });
      version.save();
      product.versions.push(version);
      await product.save();
      return product;
   } catch(error) {
      console.log(error);
   }
}

ProductSchema.methods.removeVersion = async function (versionId) {
   try {
      const version = await Version.findByIdAndDelete(versionId);
      if (!version) {
         throw new Error('Version not found');
      }
      this.versions.pull(version);
      await this.save();
      return this;
   } catch(error) {
      console.log(error);
      throw new Error('Version not found');
   }
}


ProductSchema.post("findOneAndDelete", async function(deletedProduct, next) {
   try {
      if (deletedProduct) {
         await Version.deleteMany({
            product: deletedProduct._id
         });
      }
      next();
   } catch(error) {
      console.log(error);
   }
 });

module.exports = mongoose.model('Product', ProductSchema);
