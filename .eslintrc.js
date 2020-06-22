const { files } = require('./package.json');

/** @type {import('eslint').Linter.Config} */
const config = {
  env: { node: true },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
    ecmaVersion: 2019
  },
  plugins: [
    '@typescript-eslint/eslint-plugin',
    'eslint-config',
    'eslint-plugin'
  ],
  extends: [
    './index.js',
    './@typescript-eslint.js',
    'plugin:eslint-config/rc',
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
      files: files.map(file => `./${file}`),
      extends: ['plugin:eslint-config/recommended-rules'],
      rules: {
        'eslint-config/sort-rules': 'error'
      }
    }
  ],
  rules: {
    '@typescript-eslint/no-dynamic-delete': 'off',
    '@typescript-eslint/no-namespace': 'off',
    'no-sync': 'off'
  }
};

module.exports = config;
