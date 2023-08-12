const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
require('dotenv').config();

var options = { collection: "Users" };

const UserSchema = new mongoose.Schema({
   
   email: { type: String, required: true, unique: true },

   password: { type: String, required: true },

   username: { type: String, required: true, unique: true },
   
   name: { type: String, required: false },
   
   lastname: { type: String, required: false },
   
   age: { type: Number, required: false },
   
   nationality: { type: String, required: false },
   
   address: { type: String, required: false },
   
   phone: [{ type: String, required: false }],

   createdAt: { type: Date, default: Date.now },
   
   // gender: { type: String, required: false },
   
}, options);

UserSchema.pre('save', async function (next) {

   var user = this;
   if (!this.isNew) return next();
   
   try {
      user.password = await hashPassword(user.password);
      next();
   } catch (error) { 
      return next(error);
   }
});

UserSchema.pre('findOneAndUpdate', async function (next) {
   var user = this;
   if (!user._update.password) {
      return next();
   }
   try {
      user._update.password = await hashPassword(user._update.password);
      next();
   } catch (error) { 
      return next(error);
   }
});

UserSchema.methods.isValidPassword = async function (password) {
   try {
      const user = this;
      const compare = await bcrypt.compare(password, user.password);
      return compare;
   } catch (error) {
      console.log(error);
   }
};


module.exports = mongoose.model('User', UserSchema);



async function hashPassword(password) {
   try {
      var mySalt = +process.env.SALT_WORK_FACTOR || 10;
      var err, salt = await bcrypt.genSalt(mySalt);
      if (err) throw (err);
      var err, passwordHash = await bcrypt.hash(password, salt);
      if (err) throw (err);
      return passwordHash;
   } catch (error) {
      console.log(error);
   }
}
