/** @type {import('eslint').Linter.Config} */
const config = {
  plugins: ['eslint-plugin-jest'],
  extends: [
    'plugin:eslint-plugin-jest/recommended',
    'plugin:eslint-plugin-jest/style'
  ],
  rules: {
    'jest/consistent-test-it': 'error',
    'jest/expect-expect': [
      'error',
      // todo: TBD - this will need adjusting for react-testing-library
      { assertFunctionNames: ['expect'] }
    ],
    'jest/lowercase-name': [
      'error', // todo switch to top flag once merged
      { ignore: ['describe'] }
    ],
    'jest/no-expect-resolves': 'warn',
    'jest/no-if': 'error', // todo: rename to no-conditional-expect
    'jest/no-large-snapshots': 'warn',
    'jest/no-test-return-statement': 'error',
    'jest/no-truthy-falsy': 'error',
    'jest/prefer-called-with': 'error',
    // you can disable this if you use a `beforeEach` setup script,
    'jest/prefer-expect-assertions': 'warn',
    'jest/prefer-hooks-on-top': 'error',
    'jest/prefer-inline-snapshots': 'warn',
    'jest/prefer-spy-on': 'error',
    'jest/prefer-strict-equal': 'error',
    'jest/prefer-todo': 'error',
    'jest/require-to-throw-message': 'error',
    'jest/require-top-level-describe': 'error',
    'jest/valid-title': 'error'
  }
};

module.exports = config;
