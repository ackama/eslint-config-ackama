/** @type {import('eslint').Linter.Config} */
const config = {
  env: { es2017: true },
  plugins: [
    'import',
    'prettier', //
    'eslint-comments'
  ],
  extends: [
    'eslint:recommended',
    'plugin:prettier/recommended',
    'plugin:eslint-comments/recommended'
  ],
  rules: {
    'eslint-comments/disable-enable-pair': ['error', { allowWholeFile: true }],
    'eslint-comments/no-unused-disable': 'error',
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
    'accessor-pairs': ['error', { enforceForClassMembers: true }],
    'array-callback-return': 'error',
    'block-scoped-var': 'warn',
    'callback-return': 'warn',
    'camelcase': ['error', { allow: ['child_process'] }],
    'consistent-return': 'error',
    'consistent-this': 'error',
    'curly': 'error',
    'default-case': 'error',
    'default-param-last': 'error',
    'dot-notation': 'error',
    'eqeqeq': 'error',
    'func-names': ['error', 'as-needed'],
    'global-require': 'error',
    'grouped-accessor-pairs': ['error', 'getBeforeSet'],
    'guard-for-in': 'error',
    'init-declarations': 'error',
    'lines-between-class-members': 'error',
    'max-classes-per-file': ['error', 1],
    'max-statements-per-line': ['error', { max: 1 }],
    'new-cap': ['error', { capIsNewExceptions: ['ESLintUtils.RuleCreator'] }],
    'no-alert': 'warn',
    'no-array-constructor': 'error',
    'no-await-in-loop': 'error',
    'no-bitwise': 'error',
    'no-buffer-constructor': 'error',
    'no-caller': 'error',
    'no-constructor-return': 'error',
    'no-dupe-else-if': 'error',
    // 'no-duplicate-imports': 'error', // todo: enable once https://github.com/eslint/eslint/issues/12758 is resolved
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
    'no-mixed-requires': 'error',
    'no-multi-assign': 'error',
    'no-multi-str': 'error',
    'no-nested-ternary': 'error',
    'no-new': 'error',
    'no-new-func': 'error',
    'no-new-object': 'error',
    'no-new-require': 'error',
    'no-new-wrappers': 'error',
    'no-octal-escape': 'error',
    'no-param-reassign': 'error',
    'no-path-concat': 'error',
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
    'no-process-exit': 'error',
    'no-proto': 'error',
    'no-return-assign': 'error',
    'no-return-await': 'error',
    'no-script-url': 'error',
    'no-self-compare': 'error',
    'no-sequences': 'error',
    'no-setter-return': 'error',
    'no-shadow': 'warn',
    'no-sync': 'warn',
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
    'padding-line-between-statements': [
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
    'spaced-comment': [
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

module.exports = config;
