const Admin = require('../models/Admin');
const User = require('../models/User');
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
         return res.json({ token, id: user._id });
      });
   } catch (error) {
      return next(error);
   }
}

async function getAdminById(req, res) {
   try {
      const adminId = req.user._id;
      if (req.params.id !== adminId) {
         return res.status(401).json({ error: 'Unauthorized' });
      }
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

async function getAllAdmins(req, res) {
   try {
      const admins = await Admin.find({}, "-password -adminKey").lean();
      res.status(200).json(admins);
   } catch (error) {
      console.error('Error when fetching admins:', error);
      res.status(500).json({ error: 'Error when fetching admins' });
   }
}

async function updateAdminById(req, res) {
   try {
      const adminId = req.user._id;
      if (req.params.id !== adminId) {
         return res.status(401).json({ error: 'Unauthorized' });
      }
      const { username, email, adminKey, password, name, lastname, age, nationality, address, phone } = req.body;
      const updateAdminById = await Admin.findByIdAndUpdate(adminId, 
            {
               username,
               email,
               adminKey,
               password,
               name,
               lastname,
               age,
               nationality,
               address,
               phone,
            },
            { new: true },
         ).lean();
      if (!updateAdminById) {
         return res.status(404).json({ error: 'admin not found' });
      }
      res.status(200).json(updateAdminById);
   } catch (error) {
      console.error('Error when updating admin:', error);
      res.status(500).json({ error: 'Error when updating admin' });
   }
}

async function deleteAdminById(req, res) {
   try {
      const adminId = req.user._id;
      if (req.params.id !== adminId) {
         return res.status(401).json({ error: 'Unauthorized' });
      }
      const deletedAdmin = await Admin.findByIdAndDelete(adminId).lean();
      if (!deletedAdmin) {
         return res.status(404).json({ error: 'admin not found' });
      }
      res.status(200).json(deletedAdmin);
   } catch (error) {
      console.error('Error when deleting admin:', error);
      res.status(500).json({ error: 'Error when deleting admin' });
   }
}

async function getAllUsers(req, res) {
   try {
      const users = await User.find({ __t: { $nin: ['Admin'] } }, "-password").lean();
      res.status(200).json(users);
   } catch (error) {
      console.error('Error when fetching users:', error);
      res.status(500).json({ error: 'Error when fetching users' });
   }
}


module.exports = {
   getAdminById,
   loginAdmin,
   signupAdmin,
   getAllAdmins,
   updateAdminById,
   deleteAdminById,
   getAllUsers,
};