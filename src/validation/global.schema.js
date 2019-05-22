const Joi = require('@hapi/joi');

// Write all your general Joi-specifications here so they can be imported to all schemas.
const id = Joi.string().min(1).max(24).required();
const message = Joi.string().min(1).max(1000).required();

module.exports = {
  id,
  message,
};
