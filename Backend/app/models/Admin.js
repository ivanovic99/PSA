const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./User');
require('dotenv').config();

const AdminSchema = new mongoose.Schema({
   adminKey: { type: String, required: true, unique: true, immutable: true },
});


AdminSchema.pre('save', function (next) {
   
   if (this.isNew) {
      var admin = this;

      var mySalt = +process.env.SALT_WORK_FACTOR || 10;
      bcrypt.genSalt(mySalt, function (err, salt) {
         if (err) return next(err);
   
         bcrypt.hash(admin.adminKey, salt, function (err, hash) {
            if (err) return next(err);
            admin.adminKey = hash;
            next();
         });
      });
   }

});


AdminSchema.methods.isValidPasswordAndKey = async function (password, adminKey) {
   const admin = this;
   const compareKey = await bcrypt.compare(adminKey, admin.adminKey);
   const comparePassword = await bcrypt.compare(password, admin.password);
   return compareKey && comparePassword;
}

const Admin = User.discriminator("Admin",
   AdminSchema); 

module.exports = Admin;
