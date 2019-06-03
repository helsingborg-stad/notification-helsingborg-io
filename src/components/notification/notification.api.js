const express = require('express');
const Notification = require('./notification.dal');
const { querySchema, postSchema } = require('./notification.schema');
const Validator = require('../..//middlewares/validator.middleware');

const routes = () => {
  const router = express.Router();

  router.get('/', Validator(querySchema, 'query', true), async (req, res) => {
    try {
      const { query } = req;
      const result = await Notification.query(query);

      return res.json(result);
    } catch (err) {
      return res.status(err.status || 500).json(err);
    }
  });

  router.post('/', Validator(postSchema, 'body', true), async (req, res) => {
    try {
      const { body } = req;
      await Notification.create(body);

      return res.send('Notification created successfully.');
    } catch (err) {
      return res.status(err.status || 500).json(err);
    }
  });

  return router;
};

module.exports = routes;
