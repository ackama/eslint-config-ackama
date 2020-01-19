module.exports = {
  env: { node: true },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.eslint.json',
    sourceType: 'module',
    ecmaVersion: 2019
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    './index.js',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'prettier/@typescript-eslint'
  ],
  overrides: [{ files: ['*.spec.*'], env: { jest: true } }],
  rules: {
    'no-sync': 'off'
  }
};
