import { TSESLint } from '@typescript-eslint/experimental-utils';
import dedent from 'dedent';
import rule from '../../.eslintplugin/prefer-valid-rules';

const ruleTester = new TSESLint.RuleTester({
  parser: require.resolve('@typescript-eslint/parser'),
  parserOptions: { sourceType: 'module' }
});

ruleTester.run('prefer-valid-rules', rule, {
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
    //#region deprecatedRule
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
        module.exports = {
          rules: {
            'react/no-danger': 'error'
          }
        };
      `,
      errors: [
        {
          line: 3,
          column: 5,
          messageId: 'unknownRule',
          data: { ruleId: 'react/no-danger' }
        }
      ]
    },
    //#endregion
    //#region unknownRule
    {
      code: dedent`
        module.exports = {
          rules: {
            1: 'error'
          }
        };
      `,
      errors: [
        {
          line: 3,
          column: 5,
          messageId: 'unknownRule',
          data: { ruleId: 1 }
        }
      ]
    },
    {
      code: dedent`
        const rules = {
          'react/no-danger': 'error'
        };

        module.exports = { rules };
      `,
      errors: [
        {
          line: 2,
          column: 3,
          messageId: 'unknownRule',
          data: { ruleId: 'react/no-danger' }
        }
      ]
    },
    {
      code: dedent`
        const rules = {
          'react/no-danger': 'error'
        };

        module.exports = {
          rules: {
            'react/no-danger': 'error',
            'no-shadow': 'error'
          }
        };
      `,
      errors: [
        {
          line: 2,
          column: 3,
          messageId: 'unknownRule',
          data: { ruleId: 'react/no-danger' }
        },
        {
          line: 7,
          column: 5,
          messageId: 'unknownRule',
          data: { ruleId: 'react/no-danger' }
        }
      ]
    },
    {
      code: dedent`
        module.exports = {
          plugins: ['@typescript-eslint'],
          rules: {
            '@typescript-eslint/array-type': 'error',
            'react/no-danger': 'error'
          }
        };
      `,
      errors: [
        {
          line: 5,
          column: 5,
          messageId: 'unknownRule',
          data: { ruleId: 'react/no-danger', myValue: 'hello' }
        }
      ]
    },
    //#endregion
    //#region invalidRule
    {
      code: dedent`
        module.exports = {
          rules: {
            'camelcase': ['error', { ignore: ['child_process'] }],
          }
        };
      `,
      errors: [
        {
          line: 3,
          column: 5,
          messageId: 'invalidRule',
          data: {
            ruleId: 'camelcase',
            reason:
              '\n\tValue {"ignore":["child_process"],"ignoreDestructuring":false,"ignoreImports":false} should NOT have additional properties.'
          }
        }
      ]
    },
    //#endregion
    //#region mixed
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
          line: 2,
          column: 3,
          messageId: 'unknownRule',
          data: { ruleId: 'react/no-danger' }
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
        module.exports = {
          rules: {
            '@typescript-eslint/array-type': 'error',
            'camelcase': ['error', { ignore: ['child_process'] }],
          }
        };
      `,
      errors: [
        {
          line: 3,
          column: 5,
          messageId: 'unknownRule',
          data: { ruleId: '@typescript-eslint/array-type' }
        },
        {
          line: 4,
          column: 5,
          messageId: 'invalidRule',
          data: {
            ruleId: 'camelcase',
            reason:
              '\n\tValue {"ignore":["child_process"],"ignoreDestructuring":false,"ignoreImports":false} should NOT have additional properties.'
          }
        }
      ]
    }
    //#endregion
  ]
});
