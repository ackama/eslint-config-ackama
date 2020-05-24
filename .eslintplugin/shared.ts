import ESLint from 'eslint';
import { runInNewContext } from 'vm';

const compileConfigCode = (fileCode: string): ESLint.Linter.Config =>
  (runInNewContext(fileCode, { module: { exports: {} }, require }) ??
    {}) as ESLint.Linter.Config;

const createCLIEngine = (config: ESLint.Linter.Config): ESLint.CLIEngine => {
  return new ESLint.CLIEngine({
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
};

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

export const tryCollectConfigFileInfo = (
  configText: string
): ConfigFileInfo | null => {
  try {
    const config = compileConfigCode(configText);

    return collectConfigFileInfo(config);
  } catch {
    return null;
  }
};
