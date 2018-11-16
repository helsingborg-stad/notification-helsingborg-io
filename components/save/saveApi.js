const router = require('express').Router();
const save = require('./save');
const async = require('async');
const await = require('await');
const Player = require('./playerModel');

/*
not yet implemented in boiler
const SchemaValidator = require('../middlewares/schemaValidators');
const validateRequest = SchemaValidator(true);
*/

router.post('/',/*validateRequest,*/ async (req, res) => {
    const { name } = req.body;
    const newPlayer = new Player(1000, name);

    try {
        return res.json(await save.savePlayer(newPlayer));
    } catch (err) {
        res.json(err);
    }
});

module.exports = router;

