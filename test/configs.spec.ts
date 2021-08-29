import { ESLint, Linter } from 'eslint';
import packageJsonPrettier from 'eslint-config-prettier/package.json';
import * as fs from 'fs';
import packageJson from '../package.json';

const prettierLangConfigs = packageJsonPrettier.files.filter(file =>
  file.endsWith('.js')
);
const configFiles = fs
  .readdirSync('.', { withFileTypes: true })
  .filter(
    value =>
      value.isFile() &&
      value.name.endsWith('.js') &&
      value.name !== '.eslintrc.js'
  )
  .map(value => value.name);

const requireConfig = (
  config: string
): Linter.Config &
  Required<Pick<Linter.Config, 'plugins' | 'extends' | 'rules'>> => ({
  plugins: [],
  extends: [],
  rules: {},
  // eslint-disable-next-line node/global-require,@typescript-eslint/no-require-imports,@typescript-eslint/no-var-requires
  ...(require(config) as Linter.Config)
});

describe('package.json', () => {
  it('includes every config file', () => {
    expect.hasAssertions();

    expect(packageJson.files).toStrictEqual(
      expect.arrayContaining(configFiles)
    );
  });
});

describe('for each config file', () => {
  describe.each(configFiles)('%s config', configFile => {
    const config = requireConfig(`./../${configFile}`);

    it('is valid', () => {
      expect.hasAssertions();

      const makeRuleWarn = (value: Linter.RuleEntry): Linter.RuleEntry =>
        Array.isArray(value)
          ? ['warn', ...(value.slice(1) as unknown[])]
          : 'warn';

      expect(() => {
        const baseConfig: Linter.Config = {
          ...config,
          parserOptions: {
            project: 'tsconfig.eslint.json',
            createDefaultProgram: false,
            ecmaVersion: 2019,
            sourceType: 'module'
          },
          // turn all rules on so ESLint warns if they're unknown
          rules: Object.keys(config.rules).reduce<Linter.RulesRecord>(
            (rules, name) => ({
              ...rules,
              [name]: makeRuleWarn(config.rules[name] ?? 'warn')
            }),
            {}
          )
        };

        const cliEngine = new ESLint({
          useEslintrc: false,
          // envs: ['node'],
          baseConfig
        });

        cliEngine.lintText('');
      }).not.toThrow();
    });

    if (configFile !== 'index.js' && prettierLangConfigs.includes(configFile)) {
      it('should include the prettier language config', () => {
        expect.hasAssertions();

        expect(config.extends).toContainEqual(
          `prettier/${configFile.slice(0, -3)}`
        );
      });
    }

    if (config.plugins.includes('prettier')) {
      it('should extend prettier/recommended', () => {
        expect.hasAssertions();

        expect(config.extends).toContainEqual('plugin:prettier/recommended');
      });
    }
  });
});
