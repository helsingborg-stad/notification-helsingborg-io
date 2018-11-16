//example

const Joi = require('joi');

//demands an object which continas a variable named name which contains a string
const saveObject = Joi.object().keys({
    name: Joi.string().required()
})

module.exports = {
    '/save': saveObject,
};