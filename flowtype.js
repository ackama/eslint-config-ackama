/** @type {import('eslint').Linter.Config} */
const config = {
  parser: '@babel/eslint-parser',
  plugins: ['flowtype'],
  extends: ['plugin:flowtype/recommended', 'prettier/flowtype'],
  rules: {
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
