const express = require('express');
const router = express.Router();

router.use('/save', require('./save/saveApi'));

module.exports = router;