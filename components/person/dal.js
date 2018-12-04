const redis = require('redis');
const axios = require('axios');
const https = require('https');
const client = redis.createClient();
const fs = require('fs');
const navetData = require('./objectSchemas/navetData');

client.on('error', (err) => {
    console.log('Error ' + err);
});

const axiosClient = axios.create({
    httpsAgent: new https.Agent({
        rejectUnauthorized: false,
        key: fs.readFileSync(process.env.komAKey),
        cert: fs.readFileSync(process.env.komACrt),
        passphrase: process.env.passphrase
    }),
    headers: {
        'Content-Type': 'text/xml;charset=UTF-8'
    }
});

exports.getPerson = async (body) => {
    try {
        console.log('did i enter');
        const id = body.id;
        let reply = await hget(id);
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

// redis getting the object with key id
const hget = (id) => {
    return new Promise((resolve, reject) => {
        client.hget('persons', id, (err, reply) => {
            if (err) {
                reject(err);
            } else {
                resolve(reply);
            }
        });
    });
};

// saving in redis
const hset = (id, stringData) => {
    // when saving the save object must be a string so do a stringify()
    return new Promise((resolve, reject) => {
        client.hmset('persons', id, stringData, (err, reply) => {
            if (err) {
                reject(err);
            } else {
                resolve(reply);
            }
        });
    });
};
