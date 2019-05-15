const Joi = require('@hapi/joi');

// Build your endpoint-specific schema here.
module.exports = Joi.object().keys({
  id: Joi.number().required(),
});
