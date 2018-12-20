'use strict';

const express = require('express');
const https = require('https');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger/swagger.json');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();

// !!!!!!!!!!!!!!!!!*********** Dont have this in prod
// if not set to 0 it will reject connections with self signed certificates
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => res.send('Hello World!'));

// Add components folder to the app.
app.use(require('./components'));

// Swagger for documenting the api, access through localhost:xxxx/api-docs.
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Create server with https and cert/key configured.
const server = https
    .createServer({
        key: fs.readFileSync(process.env.SERVER_KEY),
        cert: fs.readFileSync(process.env.SERVER_CERT),
        requestCert: true,
        rejectUnauthorized: false
    }, app)
    // Listen on port specfied in env-file.
    .listen(process.env.PORT,
        () => console.log(`Example app listening on port ${process.env.PORT}!`)
    );

// Export server to use it in tests.
module.exports = server;
