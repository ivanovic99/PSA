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
      const version = await Version.create({ customization, product: this._id });
      version.save();
      this.versions.push(version);
      await this.save();
      return this;
   } catch(error) {
      console.log(error);
   }
}

ProductSchema.post("findOneAndDelete", async function(deletedProduct, next) {
   if (deletedProduct) {
      await Version.deleteMany({
         product: deletedProduct._id
      });
   }
   next();
 });

module.exports = mongoose.model('Product', ProductSchema);
