const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./User');
require('dotenv').config();
const extendSchema = require('mongoose-extend-schema');


const options = { collection: 'Admin' };

const AdminSchema = extendSchema(User.schema, {
   adminKey: { type: String, required: true, unique: true, immutable: true },
}, options);


AdminSchema.pre('save', function (next) {
   
   if (this.isNew || this.isModified('adminKey') || this.isModified('password')) {
      var admin = this;

      var mySalt = +process.env.SALT_WORK_FACTOR || 10;
      bcrypt.genSalt(mySalt, function (err, salt) {
         if (err) return next(err);
   
         bcrypt.hash(admin.adminKey, salt, function (err, adminKeyHash) {
            if (err) return next(err);
            admin.adminKey = adminKeyHash;
            bcrypt.hash(admin.password, salt, function (err, passwordHash) {
               if (err) return next(err);
               admin.password = passwordHash;
               next();
            });
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

module.exports = mongoose.model('Admin', AdminSchema);
