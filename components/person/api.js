const router = require('express').Router();
const dal = require('./dal');

// Import the schemavalidator middleware.
const SchemaValidator = require('../middlewares/schemaValidator');

// Register middleware that will authenticate input against the specified schema for each endpoint.
const validateRequest = SchemaValidator(true);

// Here we register what endpoints we want.

router.post('/fetchTestData', validateRequest, async (req, res) => {
    try {
        console.log('hello ftd');
        // Get the parameters from the request
        const { id } = req.body;

        console.log('reqbody', req.body);
        // Fetch data from another layer.
        const response = await dal.fetchTestData(id);

        // Convert response to json before sending it.
        return res.json(
            response
        );
    } catch (err) {
        // Send back error in json.
        res.json(err);
    }
});

router.post('/test', validateRequest, (req, res) => {
    try {
        console.log('hello tes');

        return res.json(
            'hello'
        );
    } catch (err) {
        res.json(err);
    }
});

module.exports = router;
