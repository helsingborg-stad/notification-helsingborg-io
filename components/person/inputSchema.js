const Joi = require('joi');

// checks to se if id is a string containing numbers between 0-9
// and is 12 characters long
const id = Joi.string().regex(/^[0-9]{12}$/).required();
const obj = Joi.object();

// checks is the body object contains an object with the id object inside it.
const body = obj.keys({
    id: id
});

module.exports = {
    body
};
