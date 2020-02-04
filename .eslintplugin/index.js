// eslint-disable-next-line import/order
const registerer = require('ts-node').register({ transpileOnly: true });

registerer.enabled(true);

const preferASTTypesEnum = require('./prefer-ast-types-enum');
const preferValidRules = require('./prefer-valid-rules');
const sortRules = require('./sort-rules');

registerer.enabled(false);

exports.rules = {
  'prefer-ast-types-enum': preferASTTypesEnum,
  'prefer-valid-rules': preferValidRules,
  'sort-rules': sortRules
};
