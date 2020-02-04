import { ESLintUtils, TSESTree } from '@typescript-eslint/experimental-utils';
import ESLint from 'eslint';
import * as fs from 'fs';
import * as path from 'path';
import { runInNewContext } from 'vm';

const configFiles = fs
  .readdirSync('.', { withFileTypes: true })
  .filter(value => value.isFile() && value.name.endsWith('.js'))
  .map(value => value.name);

const isNameOfESLintConfigFile = (fname: string): boolean =>
  path.relative(fname, '.') === '..' &&
  configFiles.some(name => fname.endsWith(name));

const compileConfigCode = (fileCode: string): ESLint.Linter.Config =>
  runInNewContext(fileCode, { module: { exports: {} }, require }) ?? {};

const createCLIEngine = (config: ESLint.Linter.Config): ESLint.CLIEngine =>
  new ESLint.CLIEngine({
    useEslintrc: false,
    cache: false,
    envs: ['node'],
    baseConfig: {
      ...config,
      parserOptions: {
        project: 'tsconfig.eslint.json',
        createDefaultProgram: false,
        ecmaVersion: 2019,
        sourceType: 'module'
      }
    }
  });

interface ConfigFileInfo {
  deprecatedRules: ESLint.CLIEngine.DeprecatedRuleUse[];
  invalidRules: Record<string, string>;
  unknownRules: string[];
}

const collectConfigFileInfo = (
  config: ESLint.Linter.Config
): ConfigFileInfo => {
  const rules = { ...(config.rules ?? {}) };
  const invalidRules: Record<string, string> = {};

  do {
    try {
      const results = createCLIEngine({
        ...config,
        rules
      }).executeOnText('');

      return {
        deprecatedRules: results.usedDeprecatedRules,
        unknownRules: results.results[0].messages
          .filter(({ message }) =>
            /Definition for rule .+ was not found\./iu.test(message)
          )
          .map(({ ruleId }) => ruleId)
          .filter((ruleId): ruleId is string => !!ruleId),
        invalidRules
      };
    } catch (error) {
      const eslintError: Error = error;

      const [, ruleId, reason] =
        /Configuration for rule "(.+)" is invalid:(.+)/isu.exec(
          eslintError.message
        ) ?? [];

      if (!ruleId) {
        throw error;
      }

      invalidRules[ruleId] = reason;

      delete rules[ruleId];
    }
    // eslint-disable-next-line no-constant-condition,@typescript-eslint/no-unnecessary-condition
  } while (true);
};

export = ESLintUtils.RuleCreator(name => name)({
  name: __filename,
  meta: {
    type: 'problem',
    docs: {
      description: 'Ensures rules are valid.',
      category: 'Best Practices',
      recommended: 'error'
    },
    messages: {
      deprecatedRule:
        "'{{ ruleId }}' is deprecated in favor of '{{ replacedBy }}'",
      unknownRule: "Unknown rule '{{ ruleId }}' - Have you forgotten a plugin?",
      invalidRule:
        "The configuration for '{{ ruleId }}' is invalid: {{ reason }}"
    },
    schema: []
  },
  defaultOptions: [],
  create(context) {
    if (!isNameOfESLintConfigFile(context.getFilename())) {
      return {};
    }

    const config = compileConfigCode(context.getSourceCode().getText());

    const results = collectConfigFileInfo(config);

    return {
      Literal(node: TSESTree.Literal): void {
        const ruleId = node.value;

        if (typeof ruleId !== 'string') {
          return;
        }

        if (results.unknownRules.includes(ruleId)) {
          context.report({
            data: { ruleId },
            messageId: 'unknownRule',
            node
          });

          return;
        }

        if (ruleId in results.invalidRules) {
          context.report({
            data: { ruleId, reason: results.invalidRules[ruleId] },
            messageId: 'invalidRule',
            node
          });

          return;
        }

        const deprecation = results.deprecatedRules.find(
          rule => rule.ruleId === node.value
        );

        if (deprecation) {
          context.report({
            data: { ruleId, replacedBy: deprecation.replacedBy.join(', ') },
            messageId: 'deprecatedRule',
            node
          });
        }
      }
    };
  }
});
