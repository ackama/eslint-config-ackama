/** @type {import('eslint').Linter.Config} */
const config = {
  plugins: ['jest', 'jest-formatting'],
  extends: [
    'plugin:jest/recommended',
    'plugin:jest/style',
    'plugin:jest-formatting/recommended'
  ],
  rules: {
    '@typescript-eslint/unbound-method': 'off',
    'jest/consistent-test-it': 'error',
    'jest/expect-expect': [
      'error',
      // todo: TBD - this will need adjusting for react-testing-library
      { assertFunctionNames: ['expect'] }
    ],
    'jest/lowercase-name': ['error', { ignoreTopLevelDescribe: true }],
    'jest/no-conditional-expect': 'error',
    'jest/no-deprecated-functions': 'error',
    'jest/no-if': 'error',
    'jest/no-large-snapshots': 'warn',
    'jest/no-restricted-matchers': [
      'error',
      {
        toThrowErrorMatchingSnapshot:
          'Use `toThrowErrorMatchingInlineSnapshot()` instead',
        toMatchSnapshot: 'Use `toMatchInlineSnapshot()` instead',
        toBeTruthy: 'Avoid `toBeTruthy`',
        toBeFalsy: 'Avoid `toBeFalsy`'
      }
    ],
    'jest/no-test-return-statement': 'error',
    'jest/prefer-called-with': 'error',
    // you can disable this if you use a `beforeEach` setup script,
    'jest/prefer-expect-assertions': 'warn',
    'jest/prefer-hooks-on-top': 'error',
    'jest/prefer-spy-on': 'error',
    'jest/prefer-strict-equal': 'error',
    'jest/prefer-todo': 'error',
    'jest/require-to-throw-message': 'error',
    'jest/require-top-level-describe': 'error',
    'jest/unbound-method': 'error',
    'jest/valid-title': 'error'
  }
};

module.exports = config;
