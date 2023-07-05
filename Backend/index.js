const express = require('express');
const session = require('express-session');
const connectToDatabase = require("./config/db");
const passport = require('passport');
const middlewares = require('./config/protocolMiddlewares');
const routes = require('./app/routes/index');
require('dotenv').config();

// const passport = require('passport');

async function startServer() {
   
   // Connect to the Database
   const db = await connectToDatabase();
   
   // Initialize the Server
   const app = express();
   
   app.use(session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false
    }))
    
   // Initialize Passport
   app.use(passport.initialize());
   app.use(passport.session())


   // Configure the Middlewares & Routes
   app.use(middlewares.urlencoded);
   app.use(middlewares.bodyParser);
   // app.use(middlewares.cors);

   app.use('/api', routes);

   // Start the Server
   const port = process.env.PORT || 8080;
   app.listen(port, () => {
      console.log(`Server started and listening on port: ${port}`);
   });
}

startServer();
