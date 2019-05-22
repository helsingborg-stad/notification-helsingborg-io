# labs-api-notification
API for storing and exposing notifications; pushed by services, for users.

## Development
Prerequisite: local MySQL server running

1. Clone repository
2. Install dependencies with npm install
3. Create .env-file in the root folder with these properties
````
   PORT=3000 #(or any other port you prefer)
   LOG_LEVEL=info #(trace, debug, info, warn, error, fatal, silent)
````
4. run ```npm run migrate:latest``` (this will migrate your mysql schemas to the latest version)
5. Run project with ```npm run dev```

## Documentation

TODO

### Tests

The project uses [mocha](https://mochajs.org/) + [chai](https://www.chaijs.com/) for testing.

Running tests:

1. Create .env.test-file in the root folder with same settings as the regular .env but with a different port.
2. Run the command ```npm run test```

To run the tests on code-changes, use ```npm run test:watch```

All files following the *.test.js-syntax will be included.

## Deployment

TODO

## MySQL

The server uses MySQL as the database for storing data. The version we use is ```5.7```.

#### Migration

We use Knex to migrate the database.For ease, we have set up two scripts in the npm package.json:

```npm run migrate:latest``` - migrate to the latest version
```npm run migrate:rollback``` - rolls back the db to teh previous version (as in migration steps)

## Docker

This app can be built using [docker](https://www.docker.com/). To do so, simply navigate to the root of the project and run:

```
docker build . -t [tag] && \
docker run -d \
-p [host-port]:[server-port] \
-e PORT=[server-port] \
-e SERVER_KEY=./assets/certificates/server.key \
-e SERVER_CERT=./assets/certificates/server.cert \
[tag]
```

Further, you can thus use [docker-compose](https://docs.docker.com/compose/) to orchestrate containers created from this repository (and other dockerized apps). When developing, we use [this](https://github.com/helsingborg-stad/labs-docker-compose) specific docker-compose file.
