// Gather all your schemas and export them here.
const indexSchema = require('./indexSchema');
const testSchema = require('./testSchema');

module.exports = {
  '/': indexSchema,
  '/test': testSchema,
};
