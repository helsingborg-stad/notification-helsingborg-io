const Joi = require('@hapi/joi');
const globalSchema = require('./globalSchema');

// Build your endpoint-specific schema here.
module.exports = Joi.object().keys({
    id: Joi.number().required()
});
