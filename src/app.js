const express = require('express');
const config = require('config');
const swaggerUi = require('swagger-ui-express');
const bodyParser = require('body-parser');
const swaggerDocument = require('../swagger/swagger.json');
const routes = require('./components/routes');

const app = express();
/**
 * Init Config
 */
const SERVER_PORT = config.get('SERVER.PORT');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => res.send('Hello World!'));

// Add routes to the app.
app.use(routes());

// Swagger for documenting the api, access through localhost:xxxx/api-docs.
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Listen on port specfied in env-file.
const server = app.listen(SERVER_PORT,
  () => console.log(`Example app listening on port ${SERVER_PORT}!`)); // eslint-disable-line no-console

// Export server to use it in tests.
module.exports = server;
