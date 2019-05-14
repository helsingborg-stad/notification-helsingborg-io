/* middlewares/SchemaValidator.js */
const _ = require('lodash');
const Joi = require('@hapi/joi');

// enabled HTTP methods for request data validation
const supportedMethods = ['post', 'put'];

// Joi validation options
const validationOptions = {
  abortEarly: false, // abort after the last validation error
  allowUnknown: true, // allow unknown keys that will be ignored
  stripUnknown: true, // remove unknown keys from the validated data
};

const JoiError = (status, original) => ({
  status,
  error: {
    // eslint-disable-next-line no-underscore-dangle
    original: original._object,

    // fetch only message and type from each error
    details: _.map(original.details, ({ message, type }) => ({
      message: message.replace(/['"]/g, ''),
      type,
    })),
  },
});

const CustomError = (status, msg) => ({
  status,
  error: msg,
});

module.exports = (schema, useJoiError = false) => (
  // useJoiError determines if we should respond with the base Joi error
  // boolean: defaults to false

  // return the validation middleware
  (req, res, next) => {
    const method = req.method.toLowerCase();


    if (!_.includes(supportedMethods, method)) {
      next();
      return;
    }

    // Validate req.body using the schema and validation options
    Joi.validate(req.body, schema, validationOptions, (err, data) => {
      if (err) {
        console.log(err); // eslint-disable-line no-console

        const error = useJoiError
          ? JoiError('failed', err)
          : CustomError('failed', 'Invalid request data. Please review request and try again.');

        // Send back the JSON error response
        res.status(422).json(error);
        return;
      }

      // Replace req.body with the data after Joi validation
      req.body = data;
      next();
    });
  });
