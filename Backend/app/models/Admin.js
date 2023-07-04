const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Guest = require('./Guest');

var options = {discriminatorKey: 'type'};

const AdminSchema = Guest.discriminatorKey("Admin",
   new mongoose.Schema({ adminKey: { type: String, required: true, unique: true, immutable: true }, }, options)) 

AdminSchema.pre('save', function (next) {
   
      var admin = this;
      
      if (!admin.isModified('password') && !this.isNew) return next();
      
      if (this.isNew) admin.adminKey = bcrypt.hashSync(admin.adminKey, 10);
   
      bcrypt.genSalt(process.env.SALT_WORK_FACTOR || 10, function (err, salt) {
         if (err) return next(err);
   
         bcrypt.hash(admin.password, salt, function (err, hash) {
            if (err) return next(err);
            admin.password = hash;
            next();
         });
      });
   });

AdminSchema.methods.isValidPassword = async function (password) {
   const admin = this;
   const compare = await bcrypt.compare(password, admin.password);
   return compare;
}

AdminSchema.methods.isValidAdminKey = async function (adminKey) {
   const admin = this;
   const compare = await bcrypt.compare(adminKey, admin.adminKey);
   return compare;
}

module.exports = mongoose.model('Admin', AdminSchema);
