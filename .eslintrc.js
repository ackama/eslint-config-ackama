const { files } = require('./package.json');

/** @type {import('eslint').Linter.Config} */
const config = {
  env: { node: true },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.eslint.json',
    sourceType: 'module',
    ecmaVersion: 2019
  },
  plugins: ['@typescript-eslint/eslint-plugin', 'local', 'eslint-plugin'],
  extends: [
    './index.js',
    './@typescript-eslint.js',
    'plugin:eslint-plugin/recommended'
  ],
  overrides: [
    { files: ['*.spec.*'], extends: ['./jest.js'] },
    {
      files: ['*.js'],
      rules: {
        '@typescript-eslint/no-require-imports': 'off',
        '@typescript-eslint/no-var-requires': 'off'
      }
    },
    {
      files,
      rules: {
        'local/prefer-valid-rules': 'error',
        'local/sort-rules': 'error'
      }
    }
  ],
  rules: {
    '@typescript-eslint/no-dynamic-delete': 'off',
    '@typescript-eslint/no-namespace': 'off',
    'local/prefer-ast-types-enum': 'error',
    'no-sync': 'off'
  }
};

module.exports = config;
