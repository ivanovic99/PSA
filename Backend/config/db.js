const mongoose = require('mongoose');
require('dotenv').config();

const connectToDatabase = async () => {
   const dbUrl = process.env.MONGODB_URI || 'mongodb://localhost:27017/PSA';
   // Conexión a la base de datos en Render
   // const dbUrl = 'mongodb+srv://ivan_erlich:Ivanovic99@dbsquad15.nugafov.mongodb.net/?retryWrites=true&w=majority';
   await mongoose.connect(dbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
   });
   const db = mongoose.connection;
   db.on('error', console.error.bind(console, 'Error while conecting to the database:'));
   db.once('open', () => {
      console.log('Successfully connected to the database!');
   });
};

module.exports = connectToDatabase;