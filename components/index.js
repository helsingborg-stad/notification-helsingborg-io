const express = require('express');
const router = express.Router();

// Register route to api-layer.
router.use('/person', require('./person/api'));

module.exports = router;
