const Admin = require('../app/models/Admin');

async function isAdmin(req, res, next) {

   // Here we should check either if the user is admin or if we recieved the token from the admin
   try {
      const admin = await Admin.findById(req.user._id);
      if (!admin) {
         return res.status(401).json({ message: 'Unauthorized, not an Admin' });
      }
      next();
   } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Server Error' });
   }
}

module.exports = {
   isAdmin,
};
