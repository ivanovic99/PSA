const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const connectToDatabase = require("./config/db");
const passport = require('passport');
const middlewares = require('./config/protocolMiddlewares');
const routes = require('./app/routes/index');
const { exists } = require('./app/models/User');
require('dotenv').config();

// const passport = require('passport');

async function startServer() {
   
   try {
      const db = await connectToDatabase();
      
      // Initialize the Server
      const app = express();
   
      app.use(session({
         secret: process.env.SESSION_SECRET || "my_secret_session",
         resave: false,
         saveUninitialized: false,
         store: MongoStore.create({
            client: db.getClient(),
            // mongoUrl: dbUrlStore,
            // mongoOptions: advancedOptions
          })
      }))
      app.use(function(req,res,next){
         if(!req.session){
               return next(new Error('Oh no! The session is not working!')) //handle error
         }
         next() //otherwise continue
      });
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
      // Connect to the Database
   } catch (error) {
      console.log(error);
      // exit(1)
   }
}

startServer();

module.exports = startServer;
