/** @type {import('eslint').Linter.Config} */
const config = {
  env: { es2017: true },
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    }
  },
  settings: {
    react: {
      version: 'detect'
    }
  },
  plugins: ['prettier', 'react', 'react-hooks', 'jsx-a11y'],
  extends: [
    'plugin:jsx-a11y/recommended',
    'plugin:jsx-a11y/strict',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended'
  ],
  overrides: [
    {
      files: ['*.tsx'],
      rules: {
        'react/no-unknown-property': 'off',
        'react/prop-types': 'off',
        'react/require-render-return': 'off'
      }
    }
  ],
  rules: {
    // explicitly (re)enable this as it's disabled by eslint-config-prettier
    // and its likely our standard JS config will be used alongside this one
    'curly': 'error',

    'react/button-has-type': 'warn',
    'react/default-props-match-prop-types': 'warn',
    'react/display-name': 'off', // todo: re-look into
    'react/forbid-foreign-prop-types': 'error',
    'react/forbid-prop-types': 'warn',

    'react/function-component-definition': [
      'error',
      { namedComponents: 'arrow-function', unnamedComponents: 'arrow-function' }
    ],
    'react/jsx-boolean-value': 'warn',
    'react/jsx-curly-brace-presence': 'warn',
    'react/jsx-filename-extension': ['warn', { extensions: ['.tsx', '.jsx'] }],
    'react/jsx-fragments': 'error',
    'react/jsx-handler-names': 'error',
    'react/jsx-no-bind': 'warn',
    'react/jsx-no-script-url': 'error',
    'react/jsx-no-useless-fragment': 'error',
    'react/jsx-pascal-case': 'error',
    'react/no-access-state-in-setstate': 'error',
    'react/no-array-index-key': 'warn',
    'react/no-danger': 'error',
    'react/no-did-mount-set-state': 'error',
    'react/no-did-update-set-state': 'error',
    'react/no-multi-comp': ['warn', { ignoreStateless: true }],
    'react/no-redundant-should-component-update': 'error',
    'react/no-this-in-sfc': 'error',
    'react/no-typos': 'error',
    'react/no-unused-prop-types': 'error',
    'react/no-unused-state': 'warn',
    'react/no-will-update-set-state': 'warn',
    'react/prefer-es6-class': 'error',
    'react/prefer-read-only-props': 'error',
    'react/prefer-stateless-function': 'warn',
    'react/require-default-props': [
      'error',
      { ignoreFunctionalComponents: true }
    ],
    'react/self-closing-comp': 'warn',
    'react/state-in-constructor': ['error', 'never'],
    'react/style-prop-object': 'warn',
    'react/void-dom-elements-no-children': 'warn'
  }
};

module.exports = config;
