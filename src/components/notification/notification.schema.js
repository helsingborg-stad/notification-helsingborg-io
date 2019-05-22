const Joi = require('@hapi/joi');
const { message, id } = require('../../validation/global.schema');

const pointer = Joi.string().min(0).max(50);

// Generic Schema.
const genericSchema = Joi.object().keys({
  service_id: id,
  user_id: id,
  message,
  pointer,
});

const requestSchema = Joi.object().keys({
  service_id: id,
  user_id: id,
  message,
  pointer,
});

const responseSchema = Joi.object().keys({
  service_id: id,
  user_id: id,
  message,
  pointer,
});

module.exports = {
  genericSchema,
  requestSchema,
  responseSchema,
};
