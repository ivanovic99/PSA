const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken')


async function signupAdmin(req, res) {
   res.json({
      message: 'Signup successful. Welcome admin ' + req.user.username  + '!',
   });
}

async function loginAdmin(req, res, next, err, user, info) {
   try {
      if (err || !user) {
         console.log("err ----->", err);
         var myErrorMessage = info ? info.message : err;
         console.log("myErrorMeessage ----->", myErrorMessage);
         const error = new Error(myErrorMessage);
         return next(error);
      }
      req.login(user, { session: false }, async (error) => {
         if (error) return next(error)
         const body = { _id: user._id, email: user.email, username: user.username };
         const token = jwt.sign({ user: body }, process.env.JWT_SECRET);
         return res.json({ token });
      });
   } catch (error) {
      return next(error);
   }
}

async function getAdminById(req, res) {
   try {
      const adminId = req.user._id;
      const admin = await Admin.findById(adminId, "-password -adminKey").lean();
      if (!admin) {  
         return res.status(404).json({ error: 'admin not found' });
      }
      res.status(200).json(admin);
   } catch (error) {
      console.error('Error when fetching admin:', error);
      res.status(500).json({ error: 'Error when fetching admin' });
   }
}


module.exports = {
   getAdminById,
   loginAdmin,
   signupAdmin,
};