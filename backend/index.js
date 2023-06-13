const express = require('express');
const cors = require('cors');
const connectToDatabase = require('./config/db');
const routes = require('./app/routes');

async function startServer() {
  // Conexión a la base de datos
  const db = await connectToDatabase();

  const app = express();

  // Middleware
  app.use(express.json());
  app.use(cors());


  // Rutas
  app.use('/api', routes);

  // Iniciar el servidor
  app.listen(8080, () => {
    console.log('Servidor iniciado en el puerto 8080');
  });
}

startServer();
