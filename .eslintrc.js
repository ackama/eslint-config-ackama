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
    }
  ],
  rules: {
    '@typescript-eslint/no-namespace': 'off',
    '@typescript-eslint/no-dynamic-delete': 'off',
    'local/prefer-ast-types-enum': 'error',
    'local/prefer-valid-rules': 'error',
    'no-sync': 'off'
  }
};

module.exports = config;
