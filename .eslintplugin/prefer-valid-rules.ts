import { ESLintUtils, TSESTree } from '@typescript-eslint/experimental-utils';
import ESLint from 'eslint';
import * as path from 'path';
import packageJson from '../package.json';

// todo: fill-in until https://github.com/DefinitelyTyped/DefinitelyTyped/pull/41706 is merged
declare module 'eslint' {
  namespace CLIEngine {
    interface LintReport {
      usedDeprecatedRules: DeprecatedRuleUse[];
    }

    interface DeprecatedRuleUse {
      ruleId: string;
      replacedBy: string[];
    }
  }
}

const isNameOfESLintConfigFile = (fname: string): boolean =>
  path.relative(fname, '.') === '..' &&
  (packageJson.files.some(name => fname.endsWith(name)) ||
    fname.endsWith('.eslintrc.js'));

const requireConfig = (config: string): Required<ESLint.Linter.Config> => ({
  plugins: [],
  extends: [],
  // eslint-disable-next-line global-require
  ...require(config)
});

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

const collectConfigFileInfo = (configFile: string): ConfigFileInfo => {
  const config = requireConfig(configFile);
  const rules = { ...config.rules };
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
    // eslint-disable-next-line no-constant-condition
  } while (true);
};

// eslint-disable-next-line new-cap
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
      deprecatedRule: 'Deprecated in favor of {{ replacedBy }}',
      unknownRule: 'Unknown rule - Have you forgotten a plugin?',
      invalidRule: 'The configuration for this rule is invalid: {{ reason }}'
    },
    schema: []
  },
  defaultOptions: [],
  create(context) {
    const fileName = context.getFilename();

    if (!isNameOfESLintConfigFile(fileName)) {
      return {};
    }

    const results = collectConfigFileInfo(fileName);

    return {
      Literal(node: TSESTree.Literal): void {
        const ruleId = node.value;

        if (typeof ruleId !== 'string') {
          return;
        }

        if (results.unknownRules.includes(ruleId)) {
          context.report({
            messageId: 'unknownRule',
            node
          });

          return;
        }

        if (ruleId in results.invalidRules) {
          context.report({
            data: { reason: results.invalidRules[ruleId] },
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
            data: { replacedBy: deprecation.replacedBy.join(', ') },
            messageId: 'deprecatedRule',
            node
          });
        }
      }
    };
  }
});
