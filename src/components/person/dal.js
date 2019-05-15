const axios = require('axios');
const responseSchema = require('./response.schema');
const { validate } = require('../../validation/validation');

const client = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 5000,
});

const fetchTestData = async () => {
  try {
    // Fetch data from test api.
    const testApi = 'https://jsonplaceholder.typicode.com/posts';
    const response = await client.post(testApi);

    // Validate response against schema
    const validatedResponse = await validate(response.data, responseSchema);
    return validatedResponse;
  } catch (error) {
    console.log('error', error); // eslint-disable-line no-console
    return error;
  }
};

module.exports = {
  fetchTestData,
};
