const router = require('express').Router();
const dal = require('./dal');

// Import the schemavalidator middleware.
const SchemaValidator = require('../middlewares/schemaValidators');

// Register middleware that will authenticate input against the specified schema for each endpoint.
const validateRequest = SchemaValidator(true);

// Here we register what endpoints we want.

router.post('/', validateRequest, async (req, res) => {
    try {
        // Get the parameters from the request
        const { id } = req.body;

        // Convert response to json before sending it.
        return res.json(
            // Fetch data from another layer.
            await dal.getPerson(id)
        );
    } catch (err) {
        // Send back error in json.
        res.json(err);
    }
});

router.post('/test', validateRequest, (req, res) => {
    try {
        return res.json(
            'hello'
        );
    } catch (err) {
        res.json(err);
    }
});

module.exports = router;
