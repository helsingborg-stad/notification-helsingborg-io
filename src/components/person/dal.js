const axios = require('axios');
const responseSchema = require('./response.schema');
const { validate } = require('../../validation/validation');
const logger = require('../../utils/logger');

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
    logger.error(error);
    throw error;
  }
};

module.exports = {
  fetchTestData,
};
