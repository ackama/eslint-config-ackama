// eslint-disable-next-line import/order
const registerer = require('ts-node').register({ transpileOnly: true });

registerer.enabled(true);

const noDeprecatedRules = require('./no-deprecated-rules');
const preferASTTypesEnum = require('./prefer-ast-types-enum');
const preferValidRules = require('./prefer-valid-rules');
const sortRules = require('./sort-rules');

registerer.enabled(false);

exports.rules = {
  'no-deprecated-rules': noDeprecatedRules,
  'prefer-ast-types-enum': preferASTTypesEnum,
  'prefer-valid-rules': preferValidRules,
  'sort-rules': sortRules
};
