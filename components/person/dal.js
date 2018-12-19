const redis = require('redis');
const axios = require('axios');
const https = require('https');
const fs = require('fs');
// const navetData = require('./objectSchemas/navetData');

exports.getPerson = async (id) => {
    try {
        // let reply = await hget(id);

        const reply = {
            id: id
        };

        /*
        Example of an axios call with https and certificates
        and validating the response to what we expect to get
        const res = await axiosClient.post(process.env.navetUrl, { id });
        res.data.id = res.data.Folkbokforingspost.Personpost.PersonId.PersonNr;
        const validRes = await validate(res.data, navetData);
        */

        return reply;
    } catch (error) {
        return error;
    }
};

// validating with Joi
const validate = (input, schema) => {
    return new Promise((resolve, reject) => {
        try {
            resolve(schema.validate(input));
        } catch (error) {
            reject(error);
        }
    });
};
