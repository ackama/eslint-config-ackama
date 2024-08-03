const { FlatCompat } = require('@eslint/eslintrc');
const js = require('@eslint/js');
const globals = require('globals');
const configAckamaTypeScript = require('./@typescript-eslint');
const configAckamaBase = require('./index');
const configAckamaJest = require('./jest');

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended
});

/** @type {import('eslint').Linter.FlatConfig[]} */
const config = [
  { files: ['**/*.{js,jsx,cjs,mjs,ts,tsx,cts,mts}'] },
  ...compat.config(configAckamaBase),
  ...compat.config(configAckamaTypeScript),
  { languageOptions: { parserOptions: { project: true } } },
  {
    files: ['*.spec.*'],
    ...compat.config(configAckamaJest)
  },
  {
    files: ['**/*.js'],
    languageOptions: {
      sourceType: 'script',
      globals: globals.node
    },
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
      '@typescript-eslint/no-var-requires': 'off'
    }
  }
];

module.exports = config;
