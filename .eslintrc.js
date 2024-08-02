/** @type {import('eslint').Linter.Config} */
const config = {
  env: { node: true },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
    ecmaVersion: 2019
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: ['./index.js', './@typescript-eslint.js'],
  ignorePatterns: ['!.eslintplugin/'],
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
    '@typescript-eslint/no-dynamic-delete': 'off',
    '@typescript-eslint/no-namespace': 'off',
    'n/no-sync': 'off'
  }
};

module.exports = config;
