const router = require('express').Router();
const dal = require('./dal');
const schema = require('./schema');
const ExpressJoi = require('express-joi-validator');

// route that runs a Joi validation middleware which rejects the call
// if the req.body doesn't contain whats defined in the schema
// this route will be /getPerson as defined in the index.js file
router.post('/', ExpressJoi(schema), async (req, res) => {
    try {
        return res.json(await dal.getPerson(req.body));
    } catch (err) {
        res.json(err);
    }
});
// just test route
// this route will be /getPerson/test
router.post('/test', (req, res) => {
    try {
        console.log('this is test');
        return res.json('hello');
    } catch (err) {
        res.json(err);
    }
});

module.exports = router;
