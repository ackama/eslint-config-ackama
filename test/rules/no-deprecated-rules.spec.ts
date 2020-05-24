import { TSESLint } from '@typescript-eslint/experimental-utils';
import dedent from 'dedent';
import rule from '../../.eslintplugin/no-deprecated-rules';

const ruleTester = new TSESLint.RuleTester({
  parser: require.resolve('@typescript-eslint/parser'),
  parserOptions: { sourceType: 'module' }
});

ruleTester.run('no-deprecated-rules', rule, {
  valid: [
    dedent`
      module.exports = {
        invalidProperty: 'oh noes!'
      };
    `,
    dedent`
      module.exports = {
        ...iDoNotExist
      };
    `,
    dedent`
      module.exports = {
        rules: {
          [null]: 'error',
        }
      };
    `,
    dedent`
      const o = {
        rules: {
          'no-shadow': 'error'
        }
      }
    `,
    dedent`
      const o = {
        rules: {
          1: 'error'
        }
      }
    `,
    dedent`
      module.exports = {
        rules: {
          'no-shadow': 'error'
        }
      }
    `,
    dedent`
      module.exports = {
        plugins: ['@typescript-eslint'],
        rules: {
          '@typescript-eslint/array-type': ['error', { default: 'array-simple' }],
        }
      }
    `,
    dedent`
      const o = {
        '@typescript-eslint/array-type': 'error'
      }

      module.exports = {
        rules: {
          'no-shadow': 'error'
        }
      }
    `,
    dedent`
      const o = {
        '@typescript-eslint/array-type': 'error'
      }

      module.exports = {
        plugins: ['@typescript-eslint'],
        rules: {
          '@typescript-eslint/array-type': ['error', { default: 'array-simple' }],
          'spaced-comment': [
            'warn',
            'always',
            {
              markers: ['=', '#region'],
              exceptions: ['#endregion']
            }
          ]
        }
      }
    `
  ],
  invalid: [
    {
      code: dedent`
        const rules = {
          'no-shadow': 'error',
          'newline-before-return': 'error'
        };

        module.exports = { rules };
      `,
      errors: [
        {
          line: 3,
          column: 3,
          messageId: 'deprecatedRule',
          data: {
            ruleId: 'newline-before-return',
            replacedBy: 'padding-line-between-statements'
          }
        }
      ]
    },
    {
      code: dedent`
        const rules = {
          'newline-before-return': 'error'
        };

        module.exports = {
          rules: {
            'newline-before-return': 'error',
            'no-shadow': 'error'
          }
        };
      `,
      errors: [
        {
          line: 2,
          column: 3,
          messageId: 'deprecatedRule',
          data: {
            ruleId: 'newline-before-return',
            replacedBy: 'padding-line-between-statements'
          }
        },
        {
          line: 7,
          column: 5,
          messageId: 'deprecatedRule',
          data: {
            ruleId: 'newline-before-return',
            replacedBy: 'padding-line-between-statements'
          }
        }
      ]
    },
    {
      code: dedent`
        module.exports = {
          rules: {
            'newline-before-return': 'error'
          }
        };
      `,
      errors: [
        {
          line: 3,
          column: 5,
          messageId: 'deprecatedRule',
          data: {
            ruleId: 'newline-before-return',
            replacedBy: 'padding-line-between-statements'
          }
        }
      ]
    },
    {
      code: dedent`
        module.exports = {
          plugins: ['@typescript-eslint'],
          rules: {
            '@typescript-eslint/camelcase': 'error'
          }
        };
      `,
      errors: [
        {
          line: 4,
          column: 5,
          messageId: 'deprecatedRule',
          data: {
            ruleId: '@typescript-eslint/camelcase',
            replacedBy: 'naming-convention'
          }
        }
      ]
    },
    {
      code: dedent`
        const moreRules = {
          'newline-before-return': 'error'
        }

        module.exports = {
          plugins: ['@typescript-eslint'],
          rules: {
            '@typescript-eslint/camelcase': 'error',
            ...moreRules
          }
        };
      `,
      errors: [
        {
          line: 2,
          column: 3,
          messageId: 'deprecatedRule',
          data: {
            ruleId: 'newline-before-return',
            replacedBy: 'padding-line-between-statements'
          }
        },
        {
          line: 8,
          column: 5,
          messageId: 'deprecatedRule',
          data: {
            ruleId: '@typescript-eslint/camelcase',
            replacedBy: 'naming-convention'
          }
        }
      ]
    },
    {
      code: dedent`
        const moreRules = {
          'react/no-danger': 'error'
        }

        module.exports = {
          plugins: ['@typescript-eslint'],
          rules: {
            '@typescript-eslint/camelcase': 'error',
            ...moreRules
          }
        };
      `,
      errors: [
        {
          line: 8,
          column: 5,
          messageId: 'deprecatedRule',
          data: {
            ruleId: '@typescript-eslint/camelcase',
            replacedBy: 'naming-convention'
          }
        }
      ]
    }
  ]
});
