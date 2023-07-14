/** @type {import('eslint').Linter.Config} */
const config = {
  parser: '@typescript-eslint/parser',
  parserOptions: { sourceType: 'module' },
  plugins: ['@typescript-eslint', 'prettier'],
  extends: ['plugin:prettier/recommended'],
  rules: {
    '@typescript-eslint/adjacent-overload-signatures': 'error',
    '@typescript-eslint/array-type': ['error', { default: 'array-simple' }],
    '@typescript-eslint/await-thenable': 'error',
    '@typescript-eslint/ban-ts-comment': 'error',
    '@typescript-eslint/ban-tslint-comment': 'error',
    '@typescript-eslint/ban-types': 'error',
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
    'no-array-constructor': 'off',
    '@typescript-eslint/no-array-constructor': 'error',
    '@typescript-eslint/no-base-to-string': 'error',
    '@typescript-eslint/no-confusing-void-expression': [
      'error',
      { ignoreArrowShorthand: true }
    ],
    '@typescript-eslint/no-dupe-class-members': 'error',
    '@typescript-eslint/no-dynamic-delete': 'error',
    'no-empty-function': 'off',
    '@typescript-eslint/no-empty-function': 'error',
    '@typescript-eslint/no-empty-interface': 'error',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-extra-non-null-assertion': 'error',
    'no-extra-semi': 'off',
    '@typescript-eslint/no-extra-semi': 'error',
    '@typescript-eslint/no-extraneous-class': 'error',
    '@typescript-eslint/no-floating-promises': 'error',
    '@typescript-eslint/no-for-in-array': 'error',
    'no-implied-eval': 'off',
    '@typescript-eslint/no-implied-eval': 'error',
    '@typescript-eslint/no-inferrable-types': 'error',
    '@typescript-eslint/no-invalid-this': 'error',
    '@typescript-eslint/no-loop-func': 'error',
    'no-loss-of-precision': 'off',
    '@typescript-eslint/no-loss-of-precision': 'error',
    '@typescript-eslint/no-meaningless-void-operator': 'error',
    '@typescript-eslint/no-misused-new': 'error',
    '@typescript-eslint/no-misused-promises': 'error',
    '@typescript-eslint/no-namespace': [
      'off', // todo: need to audit existing codebase to see if declare is fine
      {
        allowDeclarations: true,
        allowDefinitionFiles: true
      }
    ],
    '@typescript-eslint/no-non-null-asserted-nullish-coalescing': 'error',
    '@typescript-eslint/no-non-null-asserted-optional-chain': 'error',
    '@typescript-eslint/no-non-null-assertion': 'warn',
    '@typescript-eslint/no-redeclare': 'error',
    '@typescript-eslint/no-require-imports': 'error',
    '@typescript-eslint/no-shadow': 'warn',
    '@typescript-eslint/no-this-alias': ['error', { allowDestructuring: true }],
    '@typescript-eslint/no-throw-literal': 'error',
    '@typescript-eslint/no-unnecessary-boolean-literal-compare': 'error',
    '@typescript-eslint/no-unnecessary-condition': 'error',
    '@typescript-eslint/no-unnecessary-qualifier': 'error',
    '@typescript-eslint/no-unnecessary-type-arguments': 'error',
    '@typescript-eslint/no-unnecessary-type-assertion': 'error',
    '@typescript-eslint/no-unnecessary-type-constraint': 'error',
    '@typescript-eslint/no-unsafe-argument': 'error',
    '@typescript-eslint/no-unsafe-assignment': 'error',
    '@typescript-eslint/no-unsafe-call': 'error',
    '@typescript-eslint/no-unsafe-member-access': 'error',
    '@typescript-eslint/no-unsafe-return': 'error',
    '@typescript-eslint/no-unused-expressions': 'error',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/no-use-before-define': [
      'error', // Purely stylistic b/c of TS
      { typedefs: false, variables: false }
    ],
    '@typescript-eslint/no-useless-constructor': 'error',
    '@typescript-eslint/no-var-requires': 'error',
    '@typescript-eslint/parameter-properties': 'error',
    '@typescript-eslint/prefer-as-const': 'error',
    '@typescript-eslint/prefer-for-of': 'error',
    '@typescript-eslint/prefer-function-type': 'error',
    '@typescript-eslint/prefer-includes': 'error',
    '@typescript-eslint/prefer-namespace-keyword': 'error',
    '@typescript-eslint/prefer-nullish-coalescing': 'error',
    '@typescript-eslint/prefer-optional-chain': 'error',
    '@typescript-eslint/prefer-readonly': 'warn',
    '@typescript-eslint/prefer-reduce-type-parameter': 'error',
    '@typescript-eslint/prefer-string-starts-ends-with': 'warn',
    '@typescript-eslint/prefer-ts-expect-error': 'error',
    '@typescript-eslint/promise-function-async': 'error',
    '@typescript-eslint/require-array-sort-compare': 'warn',
    'require-await': 'off',
    '@typescript-eslint/require-await': 'error',
    '@typescript-eslint/restrict-plus-operands': 'error',
    '@typescript-eslint/restrict-template-expressions': 'error',
    '@typescript-eslint/return-await': 'error', // types make this actually useful and correct
    '@typescript-eslint/switch-exhaustiveness-check': 'error',
    '@typescript-eslint/triple-slash-reference': 'error',
    '@typescript-eslint/unbound-method': 'error',
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
