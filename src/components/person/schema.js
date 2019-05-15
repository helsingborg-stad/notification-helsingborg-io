const Joi = require('@hapi/joi');
const globalSchema = require('../../validation/global.schema');

// Build your endpoint-specific schema here.
const body = Joi.object().keys({
  id: globalSchema.id,
});

module.exports = {
  body,
};
