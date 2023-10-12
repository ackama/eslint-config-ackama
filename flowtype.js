/** @type {import('eslint').Linter.Config} */
const config = {
  parser: '@babel/eslint-parser',
  plugins: ['flowtype', 'prettier'],
  extends: ['plugin:flowtype/recommended', 'plugin:prettier/recommended'],
  rules: {
    // explicitly (re)enable this as it's disabled by eslint-config-prettier
    // and its likely our standard JS config will be used alongside this one
    'curly': 'error',

    'flowtype/array-style-complex-type': ['error', 'verbose'],
    'flowtype/array-style-simple-type': ['error', 'shorthand'],
    'flowtype/arrow-parens': ['error', 'as-needed'],
    'flowtype/define-flow-type': 'error',
    'flowtype/newline-after-flow-annotation': 'error',
    'flowtype/no-dupe-keys': 'error',
    'flowtype/no-existential-type': 'error',
    'flowtype/no-flow-fix-me-comments': 'error',
    'flowtype/no-mixed': 'warn',
    'flowtype/no-primitive-constructor-types': 'error',
    'flowtype/no-unused-expressions': 'error',
    'flowtype/no-weak-types': 'error',
    'flowtype/require-compound-type-alias': 'warn',
    'flowtype/require-exact-type': 'warn',
    'flowtype/require-indexer-name': ['error', 'always'],
    'flowtype/require-inexact-type': 'error',
    'flowtype/require-parameter-type': 'error',
    'flowtype/require-readonly-react-props': 'error',
    'flowtype/require-return-type': [
      'warn',
      'always',
      { excludeArrowFunctions: true }
    ],
    'flowtype/require-types-at-top': 'warn',
    'flowtype/require-valid-file-annotation': [
      'error',
      'always',
      { annotationStyle: 'line', strict: true }
    ],
    'flowtype/spread-exact-type': 'error',
    'flowtype/type-import-style': ['error', 'declaration']
  }
};

module.exports = config;
