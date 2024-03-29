const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Admin = require('../app/models/Admin');
const User = require('../app/models/User');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
require('dotenv').config();


passport.use('signupAdmin', new LocalStrategy({
   passReqToCallback: true
   }, async (req, username, password, done) => {
      try {
         const { email, password, adminKey, username, name, lastname, age, nationality, adress, phone } = req.body;
         const admin = await Admin.create({ email, password, adminKey, username, name, lastname, age, nationality, adress, phone });
         admin.save({ bufferTimeoutMS: 10000 });
         return done(null, admin);
      } catch (error) {
         done(error);
      }
}));

passport.use('loginAdmin', new LocalStrategy({
   passReqToCallback: true
   }, async (req, username, password, done) => {
      password = req.body.password;
      username = req.body.username;
      const email = req.body.email;
      const adminKey = req.body.adminKey;
      try {
         const admin = email === undefined ? await Admin.findOne({ username }) : await Admin.findOne({ email });
         if (!admin) {
            return done(null, false, { message: 'Admin not found' });
         }
         const validatePasswordAndKey = await admin.isValidPasswordAndKey(password, adminKey);
         if (!validatePasswordAndKey) {
            return done(null, false, { message: 'Wrong Password or Key' });
         }
         return done(null, admin, { message: 'Logged in Successfully' });
      } catch (error) {
         return done(error);
      }
}));


passport.use('signupUser', new LocalStrategy({
   passReqToCallback: true
   }, async (req, username, password, done) => {
      try {
         const { email, password, username, name, lastname, age, nationality, adress, phone } = req.body;
         const user = await User.create({ email, password, username, name, lastname, age, nationality, adress, phone });
         user.save({ bufferTimeoutMS: 10000 });
         return done(null, user);
      } catch (error) {
         done(error);
      }
}));

passport.use('loginUser', new LocalStrategy({
   passReqToCallback: true
   }, async (req, username, password, done) => {
      password = req.body.password;
      username = req.body.username;
      const email = req.body.email;
      try {
         const user = email === undefined ? await User.findOne({ username }) : await User.findOne({ email });     
         if (!user) {
            return done(null, false, { message: 'User not found' });
         }
         const validate = await user.isValidPassword(password);
         if (!validate) {
            return done(null, false, { message: 'Wrong Password' });
         }
         return done(null, user, { message: 'Logged in Successfully' });
      } catch (error) {
         return done(error);
      }
}));


passport.serializeUser((user, done) => {
   done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
   try {
      const user = await User.findById(id);
      done(null, user);
   } catch (error) {
      done(error);
   }
});


passport.use(new JWTStrategy({
   secretOrKey: process.env.JWT_SECRET || "my_secret_jwt",
   jwtFromRequest: ExtractJWT.fromUrlQueryParameter('secret_token')
}, async (token, done) => {
      try {
         return done(null, token.user)
      } catch (e) {
         done(error)
      }
}));

module.exports = passport;
