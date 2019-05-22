const express = require('express');

const notification = require('./notification/notification.api');

const routes = () => {
  const router = express.Router();

  // Register route to api-layer.
  router.use('/notification', notification());

  return router;
};

module.exports = routes;
