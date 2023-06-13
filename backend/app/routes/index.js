const express = require('express');
const router = express.Router();
const ticketRoutes = require('./ticketRoutes');

// Rutas para los tickets
router.use('/tickets', ticketRoutes);

module.exports = router;
