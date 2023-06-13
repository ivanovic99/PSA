const { mongoose } = require('mongoose');

const url = 'mongodb://localhost:27017';
const dbName = 'pruba0';

async function connectToDatabase() {
  try {
    const db = await mongoose.connect(url, { useUnifiedTopology: true });
   //  const db = client.db(dbName);
    console.log('Conexión exitosa a la base de datos');
    return db;
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
    process.exit(1); // Salir del proceso con un código de error
  }
}

module.exports = connectToDatabase;
