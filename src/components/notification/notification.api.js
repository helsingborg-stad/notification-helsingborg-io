const express = require('express');
const Notification = require('./notification.dal');
const { postSchema } = require('./notification.schema');
const Validator = require('../..//middlewares/validator.middleware');

const routes = () => {
  const router = express.Router();

  router.get('/', async (req, res) => {
    try {
      const result = await Notification.where(req.query || {}).fetchAll();

      return res.json(result);
    } catch (err) {
      return res.status(err.status || 500).json(err);
    }
  });

  router.post('/', Validator(postSchema, true), async (req, res) => {
    try {
      const { body } = req;

      const result = await (new Notification(body)).save();
      return res.json(result);
    } catch (err) {
      return res.status(err.status || 500).json(err);
    }
  });

  return router;
};

module.exports = routes;
