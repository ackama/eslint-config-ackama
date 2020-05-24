import { ESLintUtils, TSESLint } from '@typescript-eslint/experimental-utils';
import dedent from 'dedent';
import rule from '../../.eslintplugin/no-deprecated-rules';

const ruleTester = new TSESLint.RuleTester({
  parser: require.resolve('@typescript-eslint/parser'),
  parserOptions: { sourceType: 'module' }
});

jest.mock('eslint-plugin-prettier', () => {
  return {
    rules: {
      'deprecated-rule': ESLintUtils.RuleCreator(name => name)({
        name: __filename,
        meta: {
          type: 'problem',
          docs: {
            description: 'Fake rule that is deprecated, for use in testing',
            category: 'Best Practices',
            recommended: 'warn'
          },
          deprecated: true,
          replacedBy: ['replacement-rule'],
          messages: {},
          schema: []
        },
        defaultOptions: [],
        create() {
          return {};
        }
      })
    }
  };
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
          },
          suggestions: [
            {
              messageId: 'suggestReplaceWith',
              data: { replacement: 'newline-before-return' },
              output: dedent`
                const rules = {
                  'no-shadow': 'error',
                  'padding-line-between-statements': 'error'
                };

                module.exports = { rules };
              `
            }
          ]
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
          },
          suggestions: [
            {
              messageId: 'suggestReplaceWith',
              data: { replacement: 'padding-line-between-statements' },
              output: dedent`
                const rules = {
                  'padding-line-between-statements': 'error'
                };

                module.exports = {
                  rules: {
                    'newline-before-return': 'error',
                    'no-shadow': 'error'
                  }
                };
              `
            }
          ]
        },
        {
          line: 7,
          column: 5,
          messageId: 'deprecatedRule',
          data: {
            ruleId: 'newline-before-return',
            replacedBy: 'padding-line-between-statements'
          },
          suggestions: [
            {
              messageId: 'suggestReplaceWith',
              data: { replacement: 'padding-line-between-statements' },
              output: dedent`
                const rules = {
                  'newline-before-return': 'error'
                };

                module.exports = {
                  rules: {
                    'padding-line-between-statements': 'error',
                    'no-shadow': 'error'
                  }
                };
              `
            }
          ]
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
          },
          suggestions: [
            {
              messageId: 'suggestReplaceWith',
              data: { replacement: 'padding-line-between-statements' },
              output: dedent`
                module.exports = {
                  rules: {
                    'padding-line-between-statements': 'error'
                  }
                };
              `
            }
          ]
        }
      ]
    },
    {
      code: dedent`
        module.exports = {
          plugins: ['prettier'],
          rules: {
            'prettier/deprecated-rule': 'error'
          }
        };
      `,
      errors: [
        {
          line: 4,
          column: 5,
          messageId: 'deprecatedRule',
          data: {
            ruleId: 'prettier/deprecated-rule',
            replacedBy: 'replacement-rule'
          },
          suggestions: [
            {
              messageId: 'suggestReplaceWith',
              data: { replacement: 'prettier/replacement-rule' },
              output: dedent`
                module.exports = {
                  plugins: ['prettier'],
                  rules: {
                    'prettier/replacement-rule': 'error'
                  }
                };
              `
            }
          ]
        }
      ]
    },
    {
      code: dedent`
        const moreRules = {
          'newline-before-return': 'error'
        }

        module.exports = {
          plugins: ['prettier'],
          rules: {
            'prettier/deprecated-rule': 'error',
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
          },
          suggestions: [
            {
              messageId: 'suggestReplaceWith',
              data: { replacement: 'padding-line-between-statements' },
              output: dedent`
                const moreRules = {
                  'padding-line-between-statements': 'error'
                }

                module.exports = {
                  plugins: ['prettier'],
                  rules: {
                    'prettier/deprecated-rule': 'error',
                    ...moreRules
                  }
                };
              `
            }
          ]
        },
        {
          line: 8,
          column: 5,
          messageId: 'deprecatedRule',
          data: {
            ruleId: 'prettier/deprecated-rule',
            replacedBy: 'replacement-rule'
          },
          suggestions: [
            {
              messageId: 'suggestReplaceWith',
              data: { replacement: 'prettier/replacement-rule' },
              output: dedent`
                const moreRules = {
                  'newline-before-return': 'error'
                }

                module.exports = {
                  plugins: ['prettier'],
                  rules: {
                    'prettier/replacement-rule': 'error',
                    ...moreRules
                  }
                };
              `
            }
          ]
        }
      ]
    },
    {
      code: dedent`
        const moreRules = {
          'react/no-danger': 'error'
        }

        module.exports = {
          plugins: ['prettier'],
          rules: {
            'prettier/deprecated-rule': 'error',
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
            ruleId: 'prettier/deprecated-rule',
            replacedBy: 'replacement-rule'
          },
          suggestions: [
            {
              messageId: 'suggestReplaceWith',
              data: { replacement: 'prettier/replacement-rule' },
              output: dedent`
                const moreRules = {
                  'react/no-danger': 'error'
                }

                module.exports = {
                  plugins: ['prettier'],
                  rules: {
                    'prettier/replacement-rule': 'error',
                    ...moreRules
                  }
                };
              `
            }
          ]
        }
      ]
    }
  ]
});
