module.exports = {
  env: { es2017: true },
  plugins: [
    'prettier', //
    'eslint-comments'
  ],
  extends: [
    'eslint:recommended',
    'plugin:prettier/recommended',
    'plugin:eslint-comments/recommended'
  ],
  rules: {
    'eslint-comments/no-unused-disable': 'error'
  }
};
