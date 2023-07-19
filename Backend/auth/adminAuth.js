const Admin = require('../app/models/Admin');

async function isAdmin(req, res, next) {

   // Here we should chekc either if the user is admin or if we recieved the token from the admin
   
   const admin = await Admin.findById(req.user._id);
   if (!admin) {
      return res.status(401).json({ message: 'Unauthorized' });
   }
   next();
}

module.exports = {
   isAdmin,
};
