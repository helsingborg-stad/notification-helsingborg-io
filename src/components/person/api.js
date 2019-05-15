const express = require('express');
const dal = require('./dal');
const schema = require('./schema');
const Validator = require('../..//middlewares/validator.middleware');

const routes = () => {
  const router = express.Router();
  // Register middleware that will authenticate input against the specified schema
  const validateRequest = Validator(schema, true);

  // Here we register what endpoints we want.
  router.post('/fetchTestData', validateRequest, async (req, res) => {
    try {
      // Get the parameters from the request
      const { id } = req.body;

      // Fetch data from another layer.
      const response = await dal.fetchTestData(id);

      // Convert response to json before sending it.
      return res.json(response);
    } catch (err) {
      // Send back error in json.
      return res.status(err.status || 500).json(err);
    }
  });

  router.post('/test', validateRequest, (req, res) => {
    try {
      return res.json('hello');
    } catch (err) {
      return res.status(err.status || 500).json(err);
    }
  });

  return router;
};

module.exports = routes;
