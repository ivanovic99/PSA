const mongoose = require('mongoose');
require('dotenv').config();

const connectToDatabase = async () => {

   try {
      const dbUrl = process.env.MONGODB_URI || 'mongodb://mongo:27017/'; // Go to mongoDB Atlas, create a new cluster and get the connection string! (Youtube might help you...)
      await mongoose.connect(dbUrl, {
         useNewUrlParser: true,
         useUnifiedTopology: true,
      });
      const db = mongoose.connection;
      db.on('error', console.error.bind(console, 'Error while conecting to the database:'));
      db.once('open', () => {
         console.log('Successfully connected to the database!');
      });
      return db;
   } catch (error) {
      console.log(error);
      // exite(1);
   }
};

module.exports = connectToDatabase;