const Joi = require('@hapi/joi');

// Write all your general Joi-specifications here so they can be imported to all schemas.
const id = Joi.string().min(5).max(24);
const message = Joi.string().min(10).max(1000);

// Write all your general swagger specification here so they can be imported to all swagger schemas.
const stringWithLimit = (min, max) => ({
  type: 'string',
  minLength: min,
  maxLength: max,
});

const date = () => ({
  type: 'string',
  format: 'date',
});

module.exports = {
  id,
  message,
  stringWithLimit,
  date,
};
