/**
 * Generates a config for `jest/no-restricted-matchers` that bans all variations
 * of the given base matchers
 *
 * @param {Record<string, string>} matchers
 *
 * @return {Record<string, string>}
 */
const banMatchers = matchers => {
  return Object.fromEntries(
    Object.entries(matchers).flatMap(([matcher, message]) => [
      [matcher, message],
      [`resolves.${matcher}`, message],
      [`resolves.not.${matcher}`, message],
      [`rejects.not.${matcher}`, message],
      [`not.${matcher}`, message]
    ])
  );
};

/** @type {import('eslint').Linter.Config} */
const config = {
  plugins: ['jest'],
  extends: ['plugin:jest/recommended', 'plugin:jest/style'],
  rules: {
    '@typescript-eslint/unbound-method': 'off',
    'jest/consistent-test-it': 'error',
    'jest/expect-expect': [
      'error',
      // todo: TBD - this will need adjusting for react-testing-library
      { assertFunctionNames: ['expect'] }
    ],
    'jest/no-conditional-expect': 'error',
    'jest/no-conditional-in-test': 'error',
    'jest/no-deprecated-functions': 'error',
    'jest/no-large-snapshots': 'warn',
    'jest/no-restricted-matchers': [
      'error',
      banMatchers({
        toThrowErrorMatchingSnapshot:
          'Use `toThrowErrorMatchingInlineSnapshot()` instead',
        toMatchSnapshot: 'Use `toMatchInlineSnapshot()` instead',
        toBeTruthy: 'Avoid `toBeTruthy`',
        toBeFalsy: 'Avoid `toBeFalsy`'
      })
    ],
    'jest/no-test-return-statement': 'error',
    'jest/prefer-called-with': 'error',
    // you can disable this if you use a `beforeEach` setup script,
    'jest/prefer-expect-assertions': 'warn',
    'jest/prefer-expect-resolves': 'error',
    'jest/prefer-hooks-on-top': 'error',
    'jest/prefer-lowercase-title': ['error', { ignoreTopLevelDescribe: true }],
    'jest/prefer-spy-on': 'error',
    'jest/prefer-strict-equal': 'error',
    'jest/prefer-todo': 'error',
    'jest/require-hook': 'error',
    'jest/require-to-throw-message': 'error',
    'jest/require-top-level-describe': 'error',
    'jest/unbound-method': 'error',
    'jest/valid-title': 'error',

    'jest/padding-around-after-all-blocks': 'error',
    'jest/padding-around-after-each-blocks': 'error',
    'jest/padding-around-before-all-blocks': 'error',
    'jest/padding-around-before-each-blocks': 'error',
    'jest/padding-around-describe-blocks': 'error',
    'jest/padding-around-test-blocks': 'error'
  }
};

module.exports = config;
