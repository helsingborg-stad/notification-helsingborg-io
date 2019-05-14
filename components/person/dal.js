const axios = require('axios');
const responseSchema = require('./response.schema');

// Validating response with Joi
const validate = (input, schema) => new Promise((resolve, reject) => {
  try {
    const result = schema.validate(input);
    if (result.error === null) {
      resolve(result);
    } else {
      reject(result.error);
    }
  } catch (error) {
    reject(error);
  }
});

const client = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 5000,
});

exports.fetchTestData = async () => {
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
