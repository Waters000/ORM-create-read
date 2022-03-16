const router = require('express').Router();
const apiRoutes = require('./api');

/// routes to api, then next one goes to go books
router.use('/api', apiRoutes);

module.exports = router;
