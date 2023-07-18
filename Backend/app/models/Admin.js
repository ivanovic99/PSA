const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./User');
require('dotenv').config();
const extendSchema = require('mongoose-extend-schema');


const options = { collection: 'Admin' };

const AdminSchema = extendSchema(User.schema, {
   adminKey: { type: String, required: true, unique: true, immutable: true },
}, options);


AdminSchema.pre('save', async function (next) {
   
   if (!this.isNew) return next();

   var admin = this;
   try {
      admin.password = await hashPasswordKey(admin.password);
      admin.adminKey = await hashPasswordKey(admin.adminKey);
      next();
   } catch (error) {
      return next(error);
   }
});

AdminSchema.pre('findOneAndUpdate', async function (next) {
   var admin = this;
   try {
      if (admin._update.password) {
        admin._update.password = await hashPasswordKey(admin._update.password); 
      }
      if (admin._update.adminKey) {
         admin._update.adminKey = await hashPasswordKey(admin._update.adminKey);
      }
      next();
   } catch (error) {
      return next(error);
   }
});

AdminSchema.methods.isValidPasswordAndKey = async function (password, adminKey) {
   const admin = this;
   const compareKey = await bcrypt.compare(adminKey, admin.adminKey);
   const comparePassword = await bcrypt.compare(password, admin.password);
   return compareKey && comparePassword;
}

module.exports = mongoose.model('Admin', AdminSchema);



async function hashPasswordKey(passwordKey) {
   var mySalt = +process.env.SALT_WORK_FACTOR || 10;
   var err, salt = await bcrypt.genSalt(mySalt);
   if (err) throw (err);
   var err, passwordKeyHash = await bcrypt.hash(passwordKey, salt);
   if (err) throw (err);
   return passwordKeyHash;
}