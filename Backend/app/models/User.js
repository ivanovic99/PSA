const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
require('dotenv').config();

var options = { collection: "Users" , discriminatorKey: 'type' };

const UserSchema = new mongoose.Schema({
   
   email: { type: String, required: true, unique: true },

   password: { type: String, required: true },

   username: { type: String, required: true, unique: true },
   
   name: { type: String, required: false },
   
   lastname: { type: String, required: false },
   
   age: { type: Number, required: false },
   
   nationality: { type: String, required: false },
   
   adress: { type: String, required: false },
   
   phone: [{ type: String, required: false }],

   createdAt: { type: Date, default: Date.now },
   
   // gender: { type: String, required: false },
   
}, options);

UserSchema.pre('save', function (next) {

   var user = this;
   if (!user.isModified('password') && !this.isNew) return next();
   
   var mySalt = +process.env.SALT_WORK_FACTOR || 10;
   bcrypt.genSalt(mySalt, function (err, salt) {
      if (err) return next(err);

      bcrypt.hash(user.password, salt, function (err, hash) {
         if (err) return next(err);
         user.password = hash;
         next();

      });
   });
});


UserSchema.methods.isValidPassword = async function (password) {
   const user = this;
   const compare = await bcrypt.compare(password, user.password);
   return compare;
};


module.exports = mongoose.model('User', UserSchema);
