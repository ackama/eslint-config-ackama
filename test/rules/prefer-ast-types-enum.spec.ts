import {
  AST_NODE_TYPES,
  AST_TOKEN_TYPES,
  ESLintUtils,
  TSESLint
} from '@typescript-eslint/experimental-utils';
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
    `
enum MY_ENUM {
  Literal = 1
}
    `,
    `
enum AST_NODE_TYPES {
  Literal = 'Literal'
}
    `
  ],
  invalid: ESLintUtils.batchedSingleLineTests({
    code: `
node.type === 'Literal'
node.type === 'Keyword'
    `,
    output: `
node.type === AST_NODE_TYPES.Literal
node.type === AST_TOKEN_TYPES.Keyword
    `,
    errors: [
      {
        line: 2,
        column: 15,
        messageId: 'preferEnum',
        data: {
          enumName: 'AST_NODE_TYPES',
          literal: AST_NODE_TYPES.Literal
        }
      },
      {
        line: 3,
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
