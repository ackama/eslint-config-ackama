/**
 * Generates an ESLint config for TypeScript, based on the Ackama style guide
 *
 * @return {import('eslint').Linter.FlatConfig[]|import('eslint').Linter.LegacyConfig}
 */
const generateConfig = () => {
  /** @type {import('eslint').Linter.RulesRecord} */
  const rules = {
    // explicitly (re)enable this as it's disabled by eslint-config-prettier
    // and its likely our standard JS config will be used alongside this one
    'curly': 'error',

    '@typescript-eslint/array-type': ['error', { default: 'array-simple' }],
    '@typescript-eslint/default-param-last': 'error',
    '@typescript-eslint/explicit-member-accessibility': 'error',
    '@typescript-eslint/explicit-module-boundary-types': 'error',
    '@stylistic/ts/lines-between-class-members': [
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
        custom: {
          match: true,
          regex: /^T([A-Z][a-zA-Z]+)$|^[A-Z]$/u.source
        }
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
    '@typescript-eslint/no-confusing-void-expression': [
      'error',
      { ignoreArrowShorthand: true }
    ],
    '@typescript-eslint/no-dupe-class-members': 'error',
    '@typescript-eslint/no-dynamic-delete': 'error',
    '@typescript-eslint/no-extraneous-class': 'error',
    '@typescript-eslint/no-invalid-this': 'error',
    '@typescript-eslint/no-loop-func': 'error',
    '@typescript-eslint/no-meaningless-void-operator': 'error',
    '@typescript-eslint/no-mixed-enums': 'error',
    '@typescript-eslint/no-non-null-assertion': 'error',
    '@typescript-eslint/no-namespace': [
      'off', // todo: need to audit existing codebase to see if declare is fine
      {
        allowDeclarations: true,
        allowDefinitionFiles: true
      }
    ],
    '@typescript-eslint/no-redeclare': 'error',
    '@typescript-eslint/no-shadow': 'error',
    '@typescript-eslint/no-unnecessary-boolean-literal-compare': 'error',
    '@typescript-eslint/no-unnecessary-condition': 'error',
    '@typescript-eslint/no-unnecessary-qualifier': 'error',
    '@typescript-eslint/no-unnecessary-type-arguments': 'error',
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/no-use-before-define': [
      'error', // Purely stylistic b/c of TS
      { typedefs: false, variables: false }
    ],
    '@typescript-eslint/no-useless-constructor': 'error',
    '@typescript-eslint/parameter-properties': 'error',
    '@typescript-eslint/prefer-readonly': 'error',
    '@typescript-eslint/prefer-reduce-type-parameter': 'error',
    '@typescript-eslint/prefer-string-starts-ends-with': 'error',
    '@typescript-eslint/promise-function-async': 'error',
    '@typescript-eslint/require-array-sort-compare': 'error',
    '@typescript-eslint/switch-exhaustiveness-check': 'error',
    '@typescript-eslint/unified-signatures': 'error', // can be a bit wrong
    'array-callback-return': 'off',
    'block-scoped-var': 'off',
    'camelcase': 'off',
    'consistent-return': 'off', // via --noImplicitReturns
    'default-param-last': 'off',
    'dot-notation': 'off', // @typescript-eslint
    'guard-for-in': 'off',
    'init-declarations': 'off', // handled by TS & --noImplicitAny
    'lines-between-class-members': 'off',
    '@stylistic/js/lines-between-class-members': 'off',
    'no-dupe-class-members': 'off', // @typescript-eslint
    'no-import-assign': 'off',
    'no-invalid-this': 'off', // @typescript-eslint
    'no-iterator': 'off',
    'no-loop-func': 'off', // @typescript-eslint
    'no-proto': 'off', // TS2339
    'no-setter-return': 'off', // TS2408
    'no-shadow': 'off', // @typescript-eslint
    'no-underscore-dangle': 'off',
    'no-use-before-define': 'off',
    'no-useless-constructor': 'off', // @typescript-eslint
    'strict': 'off', // via --alwaysStrict

    // todo: these are all managed by @typescript-eslint configs in v8+
    //  and so can go away when we drop support for v7
    ...{
      // these are in the recommended-type-checked config
      '@typescript-eslint/no-array-delete': 'error',
      '@typescript-eslint/no-empty-object-type': 'error',
      '@typescript-eslint/no-require-imports': 'error',
      'no-throw-literal': 'off',
      '@typescript-eslint/no-unsafe-function-type': 'error',
      '@typescript-eslint/no-unsafe-unary-minus': 'error',
      'no-unused-expressions': 'off',
      '@typescript-eslint/no-unused-expressions': 'error',
      '@typescript-eslint/no-wrapper-object-types': 'error',
      '@typescript-eslint/only-throw-error': 'error',
      '@typescript-eslint/prefer-namespace-keyword': 'error',
      'prefer-promise-reject-errors': 'off',
      '@typescript-eslint/prefer-promise-reject-errors': 'error',

      // these are in the stylistic-type-checked config
      '@typescript-eslint/prefer-find': 'error',
      '@typescript-eslint/prefer-includes': 'error',
      '@typescript-eslint/prefer-regexp-exec': 'error',

      // this can be covered by @typescript-eslint/no-require-imports in both v7 & v8
      '@typescript-eslint/no-var-requires': 'off'
    }
  };

  if (process.env.ESLINT_USE_FLAT_CONFIG !== 'false') {
    /* eslint-disable n/global-require */
    const pluginStylisticTS = require('@stylistic/eslint-plugin-ts');
    const pluginTypeScriptESLint = require('@typescript-eslint/eslint-plugin');
    const parserTypeScriptESLint = require('@typescript-eslint/parser');
    const pluginPrettier = require('eslint-plugin-prettier');
    const pluginPrettierRecommended = require('eslint-plugin-prettier/recommended');
    /* eslint-enable n/global-require */

    /** @type {import('eslint').Linter.FlatConfig[]} */
    const config = [
      {
        name: 'ackama/typescript',
        languageOptions: { parser: parserTypeScriptESLint },
        plugins: {
          '@typescript-eslint': pluginTypeScriptESLint,
          '@stylistic/ts': pluginStylisticTS,
          'prettier': pluginPrettier
        },
        rules: {
          // we have to manually include this in flat config due to @typescript-eslint
          // expecting a special helper package to be used to translate their configs
          // which we're choosing not to use, at least for now
          ...pluginTypeScriptESLint.configs['eslint-recommended'].overrides[0]
            .rules,
          ...pluginTypeScriptESLint.configs['recommended-type-checked'].rules,
          ...pluginTypeScriptESLint.configs['stylistic-type-checked'].rules,
          ...pluginPrettierRecommended.rules,
          ...rules
        }
      }
    ];

    return config;
  }

  /** @type {import('eslint').Linter.LegacyConfig} */
  const config = {
    parser: '@typescript-eslint/parser',
    parserOptions: { sourceType: 'module' },
    plugins: ['@typescript-eslint', '@stylistic/ts', 'prettier'],
    extends: [
      'plugin:@typescript-eslint/recommended-type-checked',
      'plugin:@typescript-eslint/stylistic-type-checked',
      'plugin:prettier/recommended'
    ],
    rules
  };

  return config;
};

module.exports = generateConfig();
