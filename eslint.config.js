const globals = require('globals');
const configAckamaTypeScript = require('./@typescript-eslint');
const configAckamaBase = require('./index');
const configAckamaJest = require('./jest');

/** @type {import('eslint').Linter.FlatConfig[]} */
const config = [
  { files: ['**/*.{js,jsx,cjs,mjs,ts,tsx,cts,mts}'] },
  /** @type {import('eslint').Linter.FlatConfig} */ (configAckamaBase),
  /** @type {import('eslint').Linter.FlatConfig} */ (configAckamaTypeScript),
  {
    languageOptions: {
      parserOptions: { project: true },
      globals: globals.node
    }
  },
  {
    files: ['**/*.spec.*'],
    .../** @type {import('eslint').Linter.FlatConfig} */ (configAckamaJest)
  },
  {
    files: ['**/*.js'],
    languageOptions: { sourceType: 'script' },
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
      '@typescript-eslint/no-var-requires': 'off'
    }
  }
];

module.exports = config;
