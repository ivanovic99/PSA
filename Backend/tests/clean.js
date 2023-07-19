const connectToDatabase = require("../config/db");
const mongoose = require('mongoose');
const Admin = require('../app/models/Admin');
const User = require('../app/models/User');

async function cleanDatabase() {
   try {
      // Connect to the MongoDB database
      await connectToDatabase();
      // Perform the deleteMany operation on the Admin collection
      await Admin.deleteMany({ age: { $gte: 1000 } });
      console.log('Admins deleted before running tests');
      // Perform the deleteMany operation on the User collection
      // ...

      // Close the connection to the database
      await mongoose.connection.close();
   } catch (error) {
      console.error('Error deleting:', error);
   }
}

// Call the main function and handle any uncaught errors
cleanDatabase().catch((error) => {
   console.error('Unhandled error:', error);
});
