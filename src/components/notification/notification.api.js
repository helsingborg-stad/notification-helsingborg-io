const express = require('express');
const Notification = require('./notification.dal');
const { requestSchema } = require('./notification.schema');
const Validator = require('../..//middlewares/validator.middleware');

const routes = () => {
  const router = express.Router();
  const validateRequest = Validator(requestSchema, true);

  router.get('/', async (req, res) => {
    try {
      const result = await Notification.where(req.params || {}).fetchAll();

      return res.json(result);
    } catch (err) {
      return res.status(err.status || 500).json(err);
    }
  });

  router.post('/', validateRequest, async (req, res) => {
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
