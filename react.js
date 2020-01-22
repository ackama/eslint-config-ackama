/** @type {import('eslint').Linter.Config} */
module.exports = {
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
  plugins: ['react', 'react-hooks', 'jsx-a11y', 'eslint-comments'],
  extends: [
    'plugin:jsx-a11y/recommended',
    'plugin:jsx-a11y/strict',
    'plugin:react/recommended',
    'prettier/react'
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
    'react-hooks/exhaustive-deps': 'warn',
    'react-hooks/rules-of-hooks': 'error',
    'react/function-component-definition': [
      'error',
      { namedComponents: 'arrow-function', unnamedComponents: 'arrow-function' }
    ],
    'react/button-has-type': 'warn',
    'react/prefer-read-only-props': 'error',
    'react/default-props-match-prop-types': 'warn',
    'react/forbid-prop-types': 'warn',
    'react/forbid-foreign-prop-types': 'error',
    'react/display-name': 'off', // todo: re-look into
    'react/jsx-boolean-value': 'warn',
    'react/jsx-filename-extension': ['warn', { extensions: ['.tsx', '.jsx'] }],
    'react/jsx-fragments': 'error',
    'react/jsx-handler-names': 'error',
    'react/jsx-no-bind': 'error',
    'react/jsx-no-script-url': 'error',
    'react/jsx-no-useless-fragment': 'error',
    'react/jsx-curly-brace-presence': 'warn',
    'react/jsx-pascal-case': 'error',
    'react/style-prop-object': 'warn',
    'react/no-access-state-in-setstate': 'error',
    'react/state-in-constructor': ['error', 'never'],
    'react/no-array-index-key': 'warn',
    'react/no-did-mount-set-state': 'error',
    'react/no-did-update-set-state': 'error',
    'react/no-this-in-sfc': 'error',
    'react/no-typos': 'error',
    'react/no-danger': 'error',
    'react/no-redundant-should-component-update': 'error',
    'react/no-multi-comp': ['warn', { ignoreStateless: true }],
    'react/prefer-es6-class': 'error',
    'react/no-unused-prop-types': 'error',
    'react/require-default-props': [
      'error',
      { ignoreFunctionalComponents: true }
    ],
    'react/no-unused-state': 'warn',
    'react/no-will-update-set-state': 'warn',
    'react/prefer-stateless-function': 'warn',
    'react/self-closing-comp': 'warn',
    'react/void-dom-elements-no-children': 'warn'
  }
};
