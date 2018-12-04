const express = require('express');
const router = express.Router();

// route /getPerson pointing towards person/api
router.use('/getPerson', require('./person/api'));

module.exports = router;
