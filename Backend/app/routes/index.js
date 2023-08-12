const express = require('express');
const router = express.Router();
const userRoutes = require('./userRoutes');
const adminRoutes = require('./adminRoutes');
const clientRoutes = require('./clientRoutes');
const productRoutes = require('./productRoutes');
const passport = require('../../auth/passport');

router.use('/admin', adminRoutes);
router.use('/user', userRoutes);
router.use(passport.authenticate('jwt', { session: false }));
router.use('/client', clientRoutes);
router.use('/product', productRoutes);

module.exports = router;
