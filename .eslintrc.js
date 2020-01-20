module.exports = {
  env: { node: true },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.eslint.json',
    sourceType: 'module',
    ecmaVersion: 2019
  },
  plugins: ['@typescript-eslint/eslint-plugin', 'local'],
  extends: ['./index.js', './@typescript-eslint.js'],
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
    'local/prefer-valid-rules': 'error',
    'no-sync': 'off'
  }
};
