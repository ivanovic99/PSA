const bodyParser = require('body-parser').json();
const cors = require('cors');
const urlencoded = require('express').urlencoded({ extended: true });

module.exports = { 
   urlencoded,
   bodyParser,
   cors,
};
