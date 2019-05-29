const fs = require('fs');
const config = require('../node_modules/config');
const logger = require('../src/utils/logger');
const { WsdlCallError, WsdlConnectionError, WsdlDataError } = require('../src/utils/error');
const soap = require('../node_modules/soap');

const WSDL_URI = config.get('WSDL.URI');
const WSDL_HOST = config.get('WSDL.HOST');
const WSDL_CERT = config.get('WSDL.CERT');
const WSDL_KEY = config.get('WSDL.KEY');

const WSDL_OPTIONS = {
  cert: fs.readFileSync(WSDL_CERT), // path to cert
  key: fs.readFileSync(WSDL_KEY), // path to private key
  rejectUnauthorized: false,
};

async function connect() {
  return soap.createClient(
    WSDL_URI,
    { WSDL_OPTIONS },
    (err, client) => {
      if (err) throw new WsdlConnectionError('Error creating client: ', err);
      logger.info(`Connected to SOAP service on ${WSDL_HOST}`);
      return client;
    },
  );
}

async function call(f, ...params) {
  try {
    const [res] = await f(...params);
    if (res === null) throw new WsdlDataError('NoDataFound');
    return res.result;
  } catch (e) {
    throw new WsdlCallError('The call to Mina Meddelande returned an error', e);
  }
}

module.exports = {
  connect,
  call,
};
