// eslint-disable-next-line import/order
const registerer = require('ts-node').register({ transpileOnly: true });

registerer.enabled(true);

const preferValidRules = require('./prefer-valid-rules');

registerer.enabled(false);

exports.rules = {
  'prefer-valid-rules': preferValidRules
};
