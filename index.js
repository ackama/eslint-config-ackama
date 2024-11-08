/**
 * Generates an ESLint config for JavaScript, based on the Ackama style guide
 *
 * @return {import('eslint').Linter.FlatConfig|import('eslint').Linter.LegacyConfig}
 */
const generateConfig = () => {
  if (process.env.ESLINT_USE_FLAT_CONFIG !== 'false') {
    /* eslint-disable n/global-require */
    const js = require('@eslint/js');
    const pluginEslintCommentsConfigs = require('@eslint-community/eslint-plugin-eslint-comments/configs');
    const pluginStylisticJS = require('@stylistic/eslint-plugin-js');
    const pluginImport = require('eslint-plugin-import');
    const pluginN = require('eslint-plugin-n');
    const pluginPrettier = require('eslint-plugin-prettier');
    const pluginPrettierRecommended = require('eslint-plugin-prettier/recommended');
    /* eslint-enable n/global-require */

    /** @type {import('eslint').Linter.FlatConfig} */
    const config = {
      plugins: {
        ...pluginEslintCommentsConfigs.recommended.plugins,
        '@stylistic/js': pluginStylisticJS,
        'import': pluginImport,
        'n': pluginN,
        'prettier': pluginPrettier
      },
      // ignorePatterns: [
      //   '!.eslintrc.js',
      //   'node_modules/*',
      //   'coverage/*',
      //   'bundle/*',
      //   'public/*',
      //   'vendor/*',
      //   'dist/*',
      //   'lib/*',
      //   'out/*'
      // ],
      rules: {
        ...js.configs.recommended.rules,
        ...pluginEslintCommentsConfigs.recommended.rules,
        ...pluginPrettierRecommended.rules,

        '@eslint-community/eslint-comments/disable-enable-pair': [
          'error',
          { allowWholeFile: true }
        ],
        '@eslint-community/eslint-comments/no-unused-disable': 'error',
        'import/export': 'error',
        'import/no-absolute-path': 'error',
        'import/no-anonymous-default-export': 'error',
        'import/no-mutable-exports': 'error',
        'import/no-self-import': 'error',
        'import/no-webpack-loader-syntax': 'error',
        'import/order': [
          'error',
          {
            'alphabetize': { order: 'asc' },
            'groups': [
              ['builtin', 'external', 'internal', 'unknown'],
              ['parent', 'sibling', 'index']
            ],
            'newlines-between': 'never'
          }
        ],
        'n/callback-return': 'warn',
        'n/global-require': 'error',
        'n/no-deprecated-api': 'error',
        'n/no-mixed-requires': 'error',
        'n/no-new-require': 'error',
        'n/no-path-concat': 'error',
        'n/no-process-exit': 'error',
        'n/no-sync': 'warn',
        'accessor-pairs': ['error', { enforceForClassMembers: true }],
        'array-callback-return': 'error',
        'block-scoped-var': 'warn',
        'camelcase': ['error', { allow: ['child_process'] }],
        'consistent-return': 'error',
        'consistent-this': 'error',
        'curly': 'error',
        'default-case': 'error',
        'default-param-last': 'error',
        'dot-notation': 'error',
        'eqeqeq': 'error',
        'func-names': ['error', 'as-needed'],
        'grouped-accessor-pairs': ['error', 'getBeforeSet'],
        'guard-for-in': 'error',
        'init-declarations': 'error',
        '@stylistic/js/lines-between-class-members': [
          'error',
          'always',
          { exceptAfterSingleLine: true }
        ],
        'max-classes-per-file': ['error', 1],
        'new-cap': [
          'error',
          { capIsNewExceptions: ['ESLintUtils.RuleCreator'] }
        ],
        'no-alert': 'warn',
        'no-array-constructor': 'error',
        'no-await-in-loop': 'error',
        'no-bitwise': 'error',
        'no-caller': 'error',
        'no-constructor-return': 'error',
        'no-dupe-else-if': 'error',
        'no-else-return': 'error',
        'no-empty-function': 'error',
        'no-eq-null': 'error',
        'no-eval': 'error',
        'no-extend-native': 'error',
        'no-extra-bind': 'error',
        'no-extra-label': 'error',
        'no-implicit-globals': 'error',
        'no-implied-eval': 'error',
        'no-import-assign': 'error',
        'no-invalid-this': 'error',
        'no-iterator': 'error',
        'no-label-var': 'error',
        'no-labels': 'error',
        'no-lone-blocks': 'error',
        'no-lonely-if': 'error',
        'no-loop-func': 'error',
        'no-multi-assign': 'error',
        'no-multi-str': 'error',
        'no-nested-ternary': 'error',
        'no-new': 'error',
        'no-new-func': 'error',
        'no-new-object': 'error',
        'no-new-wrappers': 'error',
        'no-octal-escape': 'error',
        'no-param-reassign': 'error',
        'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
        'no-promise-executor-return': 'error',
        'no-proto': 'error',
        'no-return-assign': 'error',
        'no-return-await': 'error',
        'no-script-url': 'error',
        'no-self-compare': 'error',
        'no-sequences': 'error',
        'no-setter-return': 'error',
        'no-shadow': 'warn',
        'no-template-curly-in-string': 'error',
        'no-throw-literal': 'error',
        'no-undef-init': 'error',
        'no-underscore-dangle': 'off',
        'no-unmodified-loop-condition': 'error',
        'no-unneeded-ternary': 'error',
        'no-unused-expressions': 'error',
        'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
        'no-use-before-define': 'error',
        'no-useless-call': 'error',
        'no-useless-computed-key': 'error',
        'no-useless-concat': 'error',
        'no-useless-constructor': 'error',
        'no-useless-rename': 'error',
        'no-useless-return': 'error',
        'no-var': 'error',
        'no-void': 'error',
        'object-shorthand': 'error',
        'one-var': ['error', 'never'],
        'operator-assignment': 'error',
        '@stylistic/js/padding-line-between-statements': [
          'error',
          {
            blankLine: 'always',
            prev: '*',
            next: 'return'
          },
          {
            blankLine: 'always',
            prev: ['const', 'let', 'var'],
            next: '*'
          },
          {
            blankLine: 'any',
            prev: ['const', 'let', 'var'],
            next: ['const', 'let', 'var']
          },
          {
            blankLine: 'always',
            prev: 'directive',
            next: '*'
          },
          {
            blankLine: 'any',
            prev: 'directive',
            next: 'directive'
          }
        ],
        'prefer-arrow-callback': 'warn',
        'prefer-const': 'error',
        'prefer-destructuring': [
          'error',
          {
            AssignmentExpression: { array: true },
            VariableDeclarator: { array: true }
          }
        ],
        'prefer-exponentiation-operator': 'error',
        'prefer-numeric-literals': 'error',
        'prefer-object-spread': 'error',
        'prefer-promise-reject-errors': 'error',
        'prefer-regex-literals': 'error',
        'prefer-rest-params': 'error',
        'prefer-spread': 'error',
        'prefer-template': 'warn',
        'radix': ['error', 'as-needed'],
        'require-await': 'off', // never
        'require-unicode-regexp': 'error',
        'sort-imports': ['error', { ignoreDeclarationSort: true }],
        'sort-vars': 'error',
        '@stylistic/js/spaced-comment': [
          'warn',
          'always',
          {
            markers: ['=', '#region'],
            exceptions: ['#endregion']
          }
        ],
        'strict': 'error',
        'symbol-description': 'error',
        'yoda': 'error'
      }
    };

    return config;
  }

  /** @type {import('eslint').Linter.LegacyConfig} */
  const config = {
    env: { es2017: true },
    plugins: [
      '@eslint-community/eslint-comments',
      '@stylistic/js',
      'prettier', //
      'import',
      'n'
    ],
    extends: [
      'eslint:recommended',
      'plugin:prettier/recommended',
      'plugin:@eslint-community/eslint-comments/recommended',
      'plugin:prettier/recommended'
    ],
    ignorePatterns: [
      '!.eslintrc.js',
      'node_modules/*',
      'coverage/*',
      'bundle/*',
      'public/*',
      'vendor/*',
      'dist/*',
      'lib/*',
      'out/*'
    ],
    rules: {
      '@eslint-community/eslint-comments/disable-enable-pair': [
        'error',
        { allowWholeFile: true }
      ],
      '@eslint-community/eslint-comments/no-unused-disable': 'error',
      'import/export': 'error',
      'import/no-absolute-path': 'error',
      'import/no-anonymous-default-export': 'error',
      'import/no-mutable-exports': 'error',
      'import/no-self-import': 'error',
      'import/no-webpack-loader-syntax': 'error',
      'import/order': [
        'error',
        {
          'alphabetize': { order: 'asc' },
          'groups': [
            ['builtin', 'external', 'internal', 'unknown'],
            ['parent', 'sibling', 'index']
          ],
          'newlines-between': 'never'
        }
      ],
      'n/callback-return': 'warn',
      'n/global-require': 'error',
      'n/no-deprecated-api': 'error',
      'n/no-mixed-requires': 'error',
      'n/no-new-require': 'error',
      'n/no-path-concat': 'error',
      'n/no-process-exit': 'error',
      'n/no-sync': 'warn',
      'accessor-pairs': ['error', { enforceForClassMembers: true }],
      'array-callback-return': 'error',
      'block-scoped-var': 'warn',
      'camelcase': ['error', { allow: ['child_process'] }],
      'consistent-return': 'error',
      'consistent-this': 'error',
      'curly': 'error',
      'default-case': 'error',
      'default-param-last': 'error',
      'dot-notation': 'error',
      'eqeqeq': 'error',
      'func-names': ['error', 'as-needed'],
      'grouped-accessor-pairs': ['error', 'getBeforeSet'],
      'guard-for-in': 'error',
      'init-declarations': 'error',
      '@stylistic/js/lines-between-class-members': [
        'error',
        'always',
        { exceptAfterSingleLine: true }
      ],
      'max-classes-per-file': ['error', 1],
      'new-cap': ['error', { capIsNewExceptions: ['ESLintUtils.RuleCreator'] }],
      'no-alert': 'warn',
      'no-array-constructor': 'error',
      'no-await-in-loop': 'error',
      'no-bitwise': 'error',
      'no-caller': 'error',
      'no-constructor-return': 'error',
      'no-dupe-else-if': 'error',
      'no-else-return': 'error',
      'no-empty-function': 'error',
      'no-eq-null': 'error',
      'no-eval': 'error',
      'no-extend-native': 'error',
      'no-extra-bind': 'error',
      'no-extra-label': 'error',
      'no-implicit-globals': 'error',
      'no-implied-eval': 'error',
      'no-import-assign': 'error',
      'no-invalid-this': 'error',
      'no-iterator': 'error',
      'no-label-var': 'error',
      'no-labels': 'error',
      'no-lone-blocks': 'error',
      'no-lonely-if': 'error',
      'no-loop-func': 'error',
      'no-multi-assign': 'error',
      'no-multi-str': 'error',
      'no-nested-ternary': 'error',
      'no-new': 'error',
      'no-new-func': 'error',
      'no-new-object': 'error',
      'no-new-wrappers': 'error',
      'no-octal-escape': 'error',
      'no-param-reassign': 'error',
      'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
      'no-promise-executor-return': 'error',
      'no-proto': 'error',
      'no-return-assign': 'error',
      'no-return-await': 'error',
      'no-script-url': 'error',
      'no-self-compare': 'error',
      'no-sequences': 'error',
      'no-setter-return': 'error',
      'no-shadow': 'warn',
      'no-template-curly-in-string': 'error',
      'no-throw-literal': 'error',
      'no-undef-init': 'error',
      'no-underscore-dangle': 'off',
      'no-unmodified-loop-condition': 'error',
      'no-unneeded-ternary': 'error',
      'no-unused-expressions': 'error',
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      'no-use-before-define': 'error',
      'no-useless-call': 'error',
      'no-useless-computed-key': 'error',
      'no-useless-concat': 'error',
      'no-useless-constructor': 'error',
      'no-useless-rename': 'error',
      'no-useless-return': 'error',
      'no-var': 'error',
      'no-void': 'error',
      'object-shorthand': 'error',
      'one-var': ['error', 'never'],
      'operator-assignment': 'error',
      '@stylistic/js/padding-line-between-statements': [
        'error',
        {
          blankLine: 'always',
          prev: '*',
          next: 'return'
        },
        {
          blankLine: 'always',
          prev: ['const', 'let', 'var'],
          next: '*'
        },
        {
          blankLine: 'any',
          prev: ['const', 'let', 'var'],
          next: ['const', 'let', 'var']
        },
        {
          blankLine: 'always',
          prev: 'directive',
          next: '*'
        },
        {
          blankLine: 'any',
          prev: 'directive',
          next: 'directive'
        }
      ],
      'prefer-arrow-callback': 'warn',
      'prefer-const': 'error',
      'prefer-destructuring': [
        'error',
        {
          AssignmentExpression: { array: true },
          VariableDeclarator: { array: true }
        }
      ],
      'prefer-exponentiation-operator': 'error',
      'prefer-numeric-literals': 'error',
      'prefer-object-spread': 'error',
      'prefer-promise-reject-errors': 'error',
      'prefer-regex-literals': 'error',
      'prefer-rest-params': 'error',
      'prefer-spread': 'error',
      'prefer-template': 'warn',
      'radix': ['error', 'as-needed'],
      'require-await': 'off', // never
      'require-unicode-regexp': 'error',
      'sort-imports': ['error', { ignoreDeclarationSort: true }],
      'sort-vars': 'error',
      '@stylistic/js/spaced-comment': [
        'warn',
        'always',
        {
          markers: ['=', '#region'],
          exceptions: ['#endregion']
        }
      ],
      'strict': 'error',
      'symbol-description': 'error',
      'yoda': 'error'
    }
  };

  return config;
};

module.exports = generateConfig();
