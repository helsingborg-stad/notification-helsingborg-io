const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express'),
    swaggerDocument = require('./swagger/swagger.json');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => res.send('Hello World!'));
app.use(require('./components'));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));