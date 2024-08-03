import ESLint from 'eslint';
import * as fs from 'fs';
import semver from 'semver/preload';
import packageJson from '../package.json';

// eslint-disable-next-line n/no-sync
const configFiles = fs
  .readdirSync('.', { withFileTypes: true })
  .filter(
    value =>
      value.isFile() &&
      value.name.endsWith('.js') &&
      !value.name.startsWith('eslint.config.')
  )
  .map(value => value.name);

const typeDeclarations = fs.readFileSync('configs.d.ts', 'utf8');

/**
 * Determines the canonical package name for the given eslint `plugin`,
 * that can be used to install the plugin using a package manager.
 *
 * Generally this is done by returning the plugin name with `eslint-plugin-`
 * appended to it (if the name does not already start with that string).
 *
 * @param {string} plugin
 *
 * @return {string}
 */
const determinePluginPackageName = (plugin: string): string => {
  if (plugin.startsWith('eslint-plugin-')) {
    return plugin;
  }

  if (plugin.startsWith('@')) {
    const [scope, name] = plugin.split('/');

    let packageName = `${scope}/eslint-plugin`;

    if (name) {
      packageName += `-${name}`;
    }

    return packageName;
  }

  return `eslint-plugin-${plugin}`;
};

const requireConfig = (
  config: string
): ESLint.Linter.Config &
  Required<Pick<ESLint.Linter.Config, 'extends' | 'plugins' | 'rules'>> => ({
  plugins: [],
  extends: [],
  rules: {},
  // eslint-disable-next-line n/global-require,@typescript-eslint/no-require-imports,@typescript-eslint/no-var-requires
  ...(require(config) as ESLint.Linter.Config)
});

describe('package.json', () => {
  it('includes every config file', () => {
    expect.hasAssertions();

    expect(packageJson.files).toStrictEqual(
      expect.arrayContaining(configFiles)
    );
  });

  it('includes typescript types', () => {
    expect.hasAssertions();

    expect(packageJson.types).toBe('configs.d.ts');
    expect(packageJson.files).toContain('configs.d.ts');
  });

  describe('peer dependencies', () => {
    it('includes eslint and prettier as required peer dependencies', () => {
      expect.hasAssertions();

      expect(Object.keys(packageJson.peerDependencies)).toContain('eslint');
      expect(Object.keys(packageJson.peerDependencies)).toContain('prettier');

      expect(packageJson.peerDependenciesMeta).toStrictEqual(
        expect.not.objectContaining({
          eslint: { optional: true },
          prettier: { optional: true }
        })
      );
    });

    it.each(Object.entries(packageJson.peerDependencies))(
      'the constraint for "%s" intersects with the dev constraint',
      (name, peerConstraint) => {
        expect.hasAssertions();

        const devConstraint =
          packageJson.devDependencies[
            name as keyof typeof packageJson.devDependencies
          ];

        expect(semver.intersects(peerConstraint, devConstraint)).toBe(true);
      }
    );
  });
});

const makeEnabledRulesWarn = (
  value: ESLint.Linter.RuleEntry
): ESLint.Linter.RuleEntry => {
  if (Array.isArray(value)) {
    return [
      value[0] !== 'off' ? 'warn' : 'off',
      ...(value.slice(1) as unknown[])
    ];
  }

  return value !== 'off' ? 'warn' : 'off';
};

describe('for each config file', () => {
  describe.each(configFiles)('%s config', configFile => {
    const config = requireConfig(`./../${configFile}`);

    it('is valid', async () => {
      expect.hasAssertions();

      const baseConfig: ESLint.Linter.Config = {
        // default to using the @typescript-eslint/parser in case we have any
        // rules that can use the type services, like `jest/unbound-method`
        parser: '@typescript-eslint/parser',
        ...config,
        parserOptions: {
          // @babel/eslint-parser
          requireConfigFile: false,

          // @typescript-eslint/parser
          project: 'tsconfig.json',
          createDefaultProgram: false,
          ecmaVersion: 2019,
          sourceType: 'module'
        },
        // make all enabled rules warn, since misconfigured rules will create errors
        rules: Object.fromEntries(
          Object.entries(config.rules).map(([name, value = 'warn']) => [
            name,
            makeEnabledRulesWarn(value)
          ])
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
          fatalErrorCount: 0
        })
      ]);
    });

    it('is defined as a module in the type declarations', () => {
      expect.hasAssertions();

      const moduleName =
        // eslint-disable-next-line jest/no-conditional-in-test
        configFile === 'index.js'
          ? 'eslint-config-ackama'
          : `eslint-config-ackama/${configFile}`;

      // we expect the module declared with and without the `.js` extension
      // to ensure support for importing in both CJS and ESM environments
      expect(typeDeclarations).toContain(`declare module '${moduleName}' {`);
      expect(typeDeclarations).toContain(
        `declare module '${moduleName.replace(/\.js$/u, '')}' {`
      );
    });

    it('lists any plugins as peer dependencies', () => {
      expect.hasAssertions();

      expect(Object.keys(packageJson.peerDependencies)).toStrictEqual(
        expect.arrayContaining(
          config.plugins.map(plugin => determinePluginPackageName(plugin))
        )
      );
    });

    if (config.parser) {
      it('lists its parser as a peer dependency', () => {
        expect.hasAssertions();

        expect(Object.keys(packageJson.peerDependencies)).toContain(
          config.parser
        );
      });
    }

    if (configFile !== 'index.js') {
      it('lists any plugins as optional peer dependencies', () => {
        expect.hasAssertions();

        expect(packageJson.peerDependenciesMeta).toStrictEqual(
          expect.objectContaining(
            Object.fromEntries(
              config.plugins
                .filter(plugin => plugin !== 'prettier')
                .map(plugin => [
                  determinePluginPackageName(plugin),
                  { optional: true }
                ])
            )
          )
        );
      });

      if (config.parser) {
        it('lists its parser as an optional peer dependency', () => {
          expect.hasAssertions();

          expect(Object.keys(packageJson.peerDependencies)).toContain(
            config.parser
          );
          expect(packageJson.peerDependenciesMeta).toHaveProperty(
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            config.parser!,
            { optional: true }
          );
        });
      }
    }

    if (configFile === 'index.js') {
      it('lists any plugins as required peer dependencies', () => {
        expect.hasAssertions();

        expect(packageJson.peerDependenciesMeta).toStrictEqual(
          expect.not.objectContaining(
            Object.fromEntries(
              config.plugins.map(plugin => [
                determinePluginPackageName(plugin),
                { optional: true }
              ])
            )
          )
        );
      });
    }

    if (configFile !== 'jest.js') {
      it('should include prettier', () => {
        expect.hasAssertions();

        expect(config.plugins).toContainEqual('prettier');
        expect(config.extends).toContainEqual('plugin:prettier/recommended');
      });

      it('should explicitly set curly', () => {
        expect.hasAssertions();

        expect(config.rules).toHaveProperty('curly', 'error');
      });
    }
  });
});
