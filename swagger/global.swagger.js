// Write all your general swagger specification here so they can be imported to all swagger schemas.
const stringWithLimit = (min, max) => ({
  type: 'string',
  minLength: min,
  maxLength: max,
});

const date = () => ({
  type: 'string',
  format: 'date',
});

module.exports = {
  stringWithLimit,
  date,
};
