import ESLint from 'eslint';
import * as fs from 'fs';
import packageJson from '../package.json';

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
): ESLint.Linter.Config &
  Required<Pick<ESLint.Linter.Config, 'plugins' | 'extends' | 'rules'>> => ({
  plugins: [],
  extends: [],
  rules: {},
  // eslint-disable-next-line node/global-require,@typescript-eslint/no-require-imports,@typescript-eslint/no-var-requires
  ...(require(config) as ESLint.Linter.Config)
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

    it('is valid', async () => {
      expect.hasAssertions();

      const baseConfig: ESLint.Linter.Config = {
        ...config,
        parserOptions: {
          // @babel/eslint-parser
          requireConfigFile: false,

          // @typescript-eslint/parser
          project: 'tsconfig.eslint.json',
          createDefaultProgram: false,
          ecmaVersion: 2019,
          sourceType: 'module'
        },
        // turn all rules on so ESLint warns if they're unknown
        rules: Object.keys(config.rules).reduce<ESLint.Linter.RulesRecord>(
          (rules, name) => ({
            ...rules,
            [name]: makeRuleWarn(config.rules[name] ?? 'warn')
          }),
          {}
        )
      };

      const linter = new ESLint.ESLint({
        useEslintrc: false,
        baseConfig
      });

      await expect(
        linter.lintText('', { filePath: './test/configs.spec.ts' })
      ).resolves.toStrictEqual([
        expect.objectContaining<Partial<ESLint.ESLint.LintResult>>({
          errorCount: 0,
          warningCount: 0,
          fatalErrorCount: 0
        })
      ]);
    });

    if (configFile !== 'jest.js') {
      it('should include prettier', () => {
        expect.hasAssertions();

        expect(config.plugins).toContainEqual('prettier');
        expect(config.extends).toContainEqual('plugin:prettier/recommended');
      });
    }
  });
});
