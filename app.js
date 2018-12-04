'use strict';
const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger/swagger.json');
const fs = require('fs');
require('body-parser-xml')(bodyParser);

const app = express();

// !!!!!!!!!!!!!!!!!*********** Dont have this in prod
// if not set to 0 it will reject connections with self signed certificates
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

// parses json in the body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.xml({ normalize: true }));

app.get('/', (req, res) => res.send('Hello World!'));

// contains endpoints such as /getPersion /test
app.use(require('./components'));

// for documenting the api, access through localhost:xxxx/api-docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// makes the server use https
const server = https.createServer({
    cert: fs.readFileSync(process.env.SERVERCERT),
    key: fs.readFileSync(process.env.SERVERKEY),
    requestCert: true,
    rejectUnauthorized: false
}, app).listen(process.env.PORT, () => console.log(`Example app listening on port 3000!`));

// exporting sever to use it in tests
module.exports = server;
