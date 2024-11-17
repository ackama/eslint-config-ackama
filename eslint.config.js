const globals = require('globals');
const configAckamaTypeScript = require('./@typescript-eslint');
const configAckamaBase = require('./index');
const configAckamaJest = require('./jest');

/** @type {import('eslint').Linter.FlatConfig[]} */
const config = [
  { name: 'custom: files', files: ['**/*.{js,jsx,cjs,mjs,ts,tsx,cts,mts}'] },
  .../** @type {import('eslint').Linter.FlatConfig[]} */ (configAckamaBase),
  .../** @type {import('eslint').Linter.FlatConfig[]} */ (
    configAckamaTypeScript
  ),
  {
    name: 'custom: options',
    languageOptions: {
      parserOptions: { project: true },
      globals: globals.node
    }
  },
  .../** @type {import('eslint').Linter.FlatConfig[]} */ (configAckamaJest).map(
    c => ({ ...c, files: ['**/*.spec.*'] })
  ),
  {
    name: 'custom: JavaScript scripts',
    files: ['**/*.js'],
    languageOptions: { sourceType: 'script' },
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
      '@typescript-eslint/no-var-requires': 'off'
    }
  },
  {
    name: 'custom: declaration files',
    files: ['**/*.d.ts'],
    rules: {
      'max-classes-per-file': 'off'
    }
  }
];

module.exports = config;
