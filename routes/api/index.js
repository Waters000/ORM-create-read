const router = require('express').Router();
const bookRoutes = require('./bookRoutes');

/// books is the main api/books.
router.use('/books', bookRoutes);

module.exports = router;
