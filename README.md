# labs-node-js-boilerplate
Boilerplate repository for nodejs based LABS projects. 

This boilerplats is built on nodejs and express. It includes an example that showcases 
everything from how the app is set up to routing and validation.

## Development

1. Clone repository.
2. Install dependencies with npm install.
3. Add certificate files (.cert / .key) to assets/certificates.
4. Create .env-file in the root folder with these properties:
⋅⋅⋅PORT=3000 (or any other port you prefer)⋅⋅
⋅⋅⋅SERVER_KEY='./assets/certificates/server.key'..
⋅⋅⋅SERVER_CERT='./assets/certificates/server.cert'
5. Run project with npm start.

### Tests

The project uses mocha + chai for testing.

Running tests:
1. Create .env.test-file in the root folder with same settings as the regular .env but with a different port.
2. Run the command npm run test:watch

All files following the *.test.js-syntax will be included.

## Deployment
------

TODO
