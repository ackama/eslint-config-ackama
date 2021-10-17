/** @type {import('eslint').Linter.Config} */
const config = {
  parser: '@typescript-eslint/parser',
  parserOptions: { sourceType: 'module' },
  plugins: ['@typescript-eslint', 'prettier'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:prettier/recommended'
  ],
  rules: {
    '@typescript-eslint/array-type': ['error', { default: 'array-simple' }],
    '@typescript-eslint/ban-tslint-comment': 'error',
    '@typescript-eslint/consistent-type-assertions': 'error',
    '@typescript-eslint/consistent-type-definitions': 'error',
    '@typescript-eslint/default-param-last': 'error',
    '@typescript-eslint/dot-notation': 'error',
    '@typescript-eslint/explicit-member-accessibility': 'error',
    '@typescript-eslint/explicit-module-boundary-types': 'error',
    '@typescript-eslint/lines-between-class-members': [
      'error',
      'always',
      { exceptAfterSingleLine: true }
    ],
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'default',
        format: ['camelCase', 'PascalCase', 'UPPER_CASE']
      },
      { selector: 'property', format: null },
      { selector: 'typeLike', format: ['PascalCase'] },
      {
        selector: 'typeParameter',
        format: ['PascalCase'],
        custom: { match: true, regex: /^T([A-Z][a-zA-Z]+)$|^[A-Z]$/u.source }
      },
      { selector: 'enumMember', format: ['PascalCase', 'UPPER_CASE'] },
      {
        selector: 'interface',
        format: ['PascalCase'], // disallow "I" prefixing, but allow names like "IAM"
        custom: { match: false, regex: /^I[A-Z][a-z]/u.source }
      },
      {
        selector: 'parameter',
        format: ['camelCase'],
        leadingUnderscore: 'allow'
      },
      {
        selector: 'memberLike',
        modifiers: ['private'],
        format: ['PascalCase', 'camelCase'],
        leadingUnderscore: 'require'
      },
      {
        selector: 'memberLike',
        modifiers: ['protected'],
        format: ['PascalCase', 'camelCase'],
        leadingUnderscore: 'require'
      },
      {
        selector: 'memberLike',
        modifiers: ['public'],
        format: ['PascalCase', 'camelCase'],
        leadingUnderscore: 'forbid'
      }
    ],
    '@typescript-eslint/no-base-to-string': 'error',
    '@typescript-eslint/no-dupe-class-members': 'error',
    '@typescript-eslint/no-dynamic-delete': 'error',
    '@typescript-eslint/no-extraneous-class': 'error',
    '@typescript-eslint/no-invalid-this': 'error',
    '@typescript-eslint/no-loop-func': 'error',
    '@typescript-eslint/no-meaningless-void-operator': 'error',
    '@typescript-eslint/no-namespace': [
      'off', // todo: need to audit existing codebase to see if declare is fine
      {
        allowDeclarations: true,
        allowDefinitionFiles: true
      }
    ],
    '@typescript-eslint/no-non-null-asserted-nullish-coalescing': 'error',
    '@typescript-eslint/no-parameter-properties': 'error',
    '@typescript-eslint/no-redeclare': 'error',
    '@typescript-eslint/no-require-imports': 'error',
    '@typescript-eslint/no-shadow': 'warn',
    '@typescript-eslint/no-this-alias': ['error', { allowDestructuring: true }],
    '@typescript-eslint/no-throw-literal': 'error',
    '@typescript-eslint/no-unnecessary-boolean-literal-compare': 'error',
    '@typescript-eslint/no-unnecessary-condition': 'error',
    '@typescript-eslint/no-unnecessary-qualifier': 'error',
    '@typescript-eslint/no-unnecessary-type-arguments': 'error',
    '@typescript-eslint/no-unused-expressions': 'error',
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/no-use-before-define': [
      'error', // Purely stylistic b/c of TS
      { typedefs: false, variables: false }
    ],
    '@typescript-eslint/no-useless-constructor': 'error',
    '@typescript-eslint/prefer-for-of': 'error',
    '@typescript-eslint/prefer-function-type': 'error',
    '@typescript-eslint/prefer-includes': 'error',
    '@typescript-eslint/prefer-nullish-coalescing': 'error',
    '@typescript-eslint/prefer-optional-chain': 'error',
    '@typescript-eslint/prefer-readonly': 'warn',
    '@typescript-eslint/prefer-reduce-type-parameter': 'error',
    '@typescript-eslint/prefer-string-starts-ends-with': 'warn',
    '@typescript-eslint/prefer-ts-expect-error': 'error',
    '@typescript-eslint/promise-function-async': 'error',
    '@typescript-eslint/require-array-sort-compare': 'warn',
    // yes: with types, this is actually useful and correct
    '@typescript-eslint/return-await': 'error',
    '@typescript-eslint/switch-exhaustiveness-check': 'error',
    '@typescript-eslint/unified-signatures': 'warn', // can be a bit wrong
    'array-callback-return': 'off',
    'block-scoped-var': 'off',
    'camelcase': 'off',
    'consistent-return': 'off', // via --noImplicitReturns
    'default-param-last': 'off',
    'dot-notation': 'off', // @typescript-eslint
    'guard-for-in': 'off',
    'init-declarations': 'off', // handled by TS & --noImplicitAny
    'lines-between-class-members': 'off',
    'no-dupe-class-members': 'off', // @typescript-eslint
    'no-import-assign': 'off',
    'no-invalid-this': 'off', // @typescript-eslint
    'no-iterator': 'off',
    'no-loop-func': 'off', // @typescript-eslint
    'no-proto': 'off', // TS2339
    'no-setter-return': 'off', // TS2408
    'no-shadow': 'off', // @typescript-eslint
    'no-throw-literal': 'off', // @typescript-eslint
    'no-underscore-dangle': 'off',
    'no-unused-expressions': 'off',
    'no-use-before-define': 'off',
    'no-useless-constructor': 'off', // @typescript-eslint
    'strict': 'off' // via --alwaysStrict
  }
};

module.exports = config;
