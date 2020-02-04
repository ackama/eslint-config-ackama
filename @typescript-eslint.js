/** @type {import('eslint').Linter.Config} */
const config = {
  parser: '@typescript-eslint/parser',
  parserOptions: { sourceType: 'module' },
  plugins: ['@typescript-eslint'],
  extends: [
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'prettier/@typescript-eslint'
  ],
  rules: {
    '@typescript-eslint/array-type': ['error', { default: 'array-simple' }],
    // eslint-disable-next-line local/prefer-valid-rules
    '@typescript-eslint/camelcase': ['error', { allow: ['child_process'] }],
    '@typescript-eslint/consistent-type-definitions': 'error',
    '@typescript-eslint/default-param-last': 'error',
    '@typescript-eslint/explicit-member-accessibility': 'error',
    // eslint-disable-next-line local/prefer-valid-rules
    '@typescript-eslint/generic-type-naming': [
      'error',
      /^T([A-Z][a-zA-Z]+)$|^[A-Z]$/u.toString().slice(1, -2)
    ],
    // eslint-disable-next-line local/prefer-valid-rules
    '@typescript-eslint/member-naming': [
      'warn',
      { private: '^_', protected: '^_' }
    ],
    '@typescript-eslint/no-dynamic-delete': 'error',
    '@typescript-eslint/no-extra-non-null-assertion': 'error',
    '@typescript-eslint/no-extraneous-class': 'error',
    '@typescript-eslint/no-floating-promises': 'error',
    '@typescript-eslint/no-namespace': [
      'off', // todo: need to audit existing codebase to see if declare is fine
      {
        allowDeclarations: true,
        allowDefinitionFiles: true
      }
    ],
    '@typescript-eslint/no-parameter-properties': 'error',
    '@typescript-eslint/no-require-imports': 'error',
    '@typescript-eslint/no-this-alias': ['error', { allowDestructuring: true }],
    '@typescript-eslint/no-throw-literal': 'error',
    '@typescript-eslint/no-unnecessary-condition': [
      'error',
      // todo: remove once https://github.com/typescript-eslint/typescript-eslint/pull/1163 is merged
      { ignoreRhs: true }
    ],
    '@typescript-eslint/no-unnecessary-qualifier': 'error',
    '@typescript-eslint/no-unnecessary-type-arguments': 'error',
    '@typescript-eslint/no-unused-expressions': 'error',
    '@typescript-eslint/explicit-module-boundary-types': 'error',
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/no-use-before-define': [
      'error', // Purely stylistic b/c of TS
      { typedefs: false, variables: false }
    ],
    '@typescript-eslint/no-useless-constructor': 'error',
    '@typescript-eslint/prefer-for-of': 'error',
    '@typescript-eslint/prefer-function-type': 'error',
    '@typescript-eslint/prefer-nullish-coalescing': 'error',
    '@typescript-eslint/prefer-optional-chain': 'error',
    '@typescript-eslint/prefer-readonly': 'warn',
    '@typescript-eslint/prefer-regexp-exec': 'warn',
    '@typescript-eslint/prefer-string-starts-ends-with': 'warn',
    '@typescript-eslint/promise-function-async': 'error',
    '@typescript-eslint/require-array-sort-compare': 'warn',
    '@typescript-eslint/restrict-plus-operands': 'error',
    '@typescript-eslint/restrict-template-expressions': [
      'error',
      {
        allowBoolean: true,
        allowNumber: true
      }
    ],
    // yes: with types, this is actually useful and correct
    '@typescript-eslint/return-await': 'error',
    '@typescript-eslint/unbound-method': 'warn', // can be a bit wrong
    '@typescript-eslint/unified-signatures': 'warn', // can be a bit wrong

    'no-unused-expressions': 'off',
    'array-callback-return': 'off',
    'block-scoped-var': 'off',
    'consistent-return': 'off', // via --noImplicitReturns
    'default-param-last': 'off',
    'guard-for-in': 'off',
    'init-declarations': 'off', // handled by TS & --noImplicitAny
    'no-import-assign': 'off',
    'no-invalid-this': 'off',
    'no-iterator': 'off',
    'no-proto': 'off', // TS2339
    'no-setter-return': 'off', // TS2408
    'no-throw-literal': 'off', // @typescript-eslint
    'no-underscore-dangle': 'off',
    'no-useless-constructor': 'off', // @typescript-eslint
    'strict': 'off' // via --alwaysStrict
  }
};

module.exports = config;
