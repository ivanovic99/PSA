const express = require('express');
const router = express.Router();
const userRoutes = require('./userRoutes');
const adminRoutes = require('./adminRoutes');

router.use('/admin', adminRoutes);
router.use('/user', userRoutes);

module.exports = router;
