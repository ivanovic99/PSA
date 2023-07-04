const bodyParser = require('body-parser').json();
const cors = require('cors');
const jwt = require('jsonwebtoken');
const urlencoded = require('express').urlencoded({ extended: true });


const verifyAuthentication = (req, res, next) => {
   // console.log("req.header token", req.header('secret_token'));
  const token = req.header('secret_token');

  if (!token) {
    return res.status(401).json({ mensaje: 'Access unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = decoded.usuario;  // I think it's not necessary
    next();
  } catch (error) {
    return res.status(401).json({ mensaje: 'Access unauthorized' });
  }
};

module.exports = { 
   urlencoded,
   bodyParser,
   cors,
   verifyAuthentication,
};
