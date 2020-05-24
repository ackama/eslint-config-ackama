import { ESLintUtils, TSESTree } from '@typescript-eslint/experimental-utils';
import { tryCollectConfigFileInfo } from './shared';

export = ESLintUtils.RuleCreator(name => name)({
  name: __filename,
  meta: {
    type: 'problem',
    docs: {
      description: 'Checks for usage of deprecated eslint rules',
      category: 'Best Practices',
      recommended: 'warn'
    },
    messages: {
      deprecatedRule:
        "'{{ ruleId }}' is deprecated in favor of '{{ replacedBy }}'"
    },
    schema: []
  },
  defaultOptions: [],
  create(context) {
    const results = tryCollectConfigFileInfo(context.getSourceCode().getText());

    if (!results) {
      return {};
    }

    return {
      Literal(node: TSESTree.Literal): void {
        if (node.value === null) {
          return;
        }

        const deprecation = results.deprecatedRules.find(
          rule => rule.ruleId === node.value
        );

        if (deprecation) {
          context.report({
            data: {
              ruleId: node.value.toString(),
              replacedBy: deprecation.replacedBy.join(', ')
            },
            messageId: 'deprecatedRule',
            node
          });
        }
      }
    };
  }
});
