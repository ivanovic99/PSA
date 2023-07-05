const Admin = require('../app/models/Admin');

async function isAdmin(req, res, next) {
   const admin = await Admin.findById(req.user._id);
   if (!admin) {
      return res.status(401).json({ message: 'Unauthorized' });
   }
   next();
}

module.exports = {
   isAdmin,
};
