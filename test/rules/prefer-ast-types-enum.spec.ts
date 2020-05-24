import {
  AST_NODE_TYPES,
  AST_TOKEN_TYPES,
  ESLintUtils,
  TSESLint
} from '@typescript-eslint/experimental-utils';
import dedent from 'dedent';
import rule from '../../.eslintplugin/prefer-ast-types-enum';

const ruleTester = new TSESLint.RuleTester({
  parser: require.resolve('@typescript-eslint/parser'),
  parserOptions: { sourceType: 'module' }
});

ruleTester.run('prefer-ast-types-enum', rule, {
  valid: [
    'node.type === "constructor"',
    'node.type === AST_NODE_TYPES.Literal',
    'node.type === AST_TOKEN_TYPES.Keyword',
    'node.type === 1',
    dedent`
      enum MY_ENUM {
        Literal = 1
      }
    `,
    dedent`
      enum AST_NODE_TYPES {
        Literal = 'Literal'
      }
    `
  ],
  invalid: ESLintUtils.batchedSingleLineTests({
    code: dedent`
      node.type === 'Literal'
      node.type === 'Keyword'
    `,
    output: dedent`
      node.type === AST_NODE_TYPES.Literal
      node.type === AST_TOKEN_TYPES.Keyword
    `,
    errors: [
      {
        line: 1,
        column: 15,
        messageId: 'preferEnum',
        data: {
          enumName: 'AST_NODE_TYPES',
          literal: AST_NODE_TYPES.Literal
        }
      },
      {
        line: 2,
        column: 15,
        messageId: 'preferEnum',
        data: {
          enumName: 'AST_TOKEN_TYPES',
          literal: AST_TOKEN_TYPES.Keyword
        }
      }
    ]
  })
});
