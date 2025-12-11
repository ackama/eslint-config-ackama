process.env.ESLINT_USE_FLAT_CONFIG = 'true';

import * as parserTypeScriptESLint from '@typescript-eslint/parser';
import ESLint from 'eslint';
import { FlatESLint } from 'eslint/use-at-your-own-risk';
import semver from 'semver/preload';
import {
  configFiles,
  determinePluginPackageName,
  makeEnabledRulesWarn,
  projectServicePropertyName,
  typeDeclarations
} from './helpers';
import packageJson from '../package.json';

// flat config does not include any information about the package that provides
// the parser being used, so this map holds that information manually
const packagesForParsers = new Map<unknown, string>([
  [parserTypeScriptESLint, '@typescript-eslint/parser']
]);

const requireConfig = (
  config: string
): Array<
  ESLint.Linter.FlatConfig &
    Required<Pick<ESLint.Linter.FlatConfig, 'plugins' | 'rules'>>
> => {
  return (
    // eslint-disable-next-line n/global-require,@typescript-eslint/no-require-imports
    (require(config) as ESLint.Linter.FlatConfig[])
      // exclude config objects that are specifying global ignores
      .filter(c => Object.keys(c).length !== 1 || !('ignores' in c))
      // ensure that all configs have default values for plugins and rules
      .map(c => ({ plugins: {}, rules: {}, ...c }))
  );
};

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

describe('for each config file', () => {
  describe.each(configFiles)('%s config', configFile => {
    const config = requireConfig(`./../${configFile}`);

    it('is valid', async () => {
      expect.hasAssertions();

      const baseConfig: ESLint.Linter.FlatConfig[] = config.map(c => ({
        files: ['**/test/empty.ts'],
        ...c,
        languageOptions: {
          // default to using the @typescript-eslint/parser in case we have any
          // rules that can use the type services, like `jest/unbound-method`
          parser: parserTypeScriptESLint,
          ...c.languageOptions,
          parserOptions: {
            // we have to cast to ensure this is considered an object by typescript
            // across all eslint and plugin version combinations
            // todo: we shouldn't need this once we drop support for older versions
            ...(c.languageOptions?.parserOptions as Record<string, unknown>),
            // @typescript-eslint/parser
            [projectServicePropertyName]: true,
            // todo: see if we can axe this once we're dropped support for older versions
            disallowAutomaticSingleRunInference: true,
            createDefaultProgram: false,
            ecmaVersion: 2019
          }
        },
        // make all enabled rules warn, since misconfigured rules will create errors
        rules: Object.fromEntries(
          Object.entries(c.rules).map(([name, value = 'warn']) => [
            name,
            makeEnabledRulesWarn(value)
          ])
        )
      }));

      const linter = new FlatESLint({
        overrideConfig: baseConfig,
        overrideConfigFile: true
      });

      await expect(
        linter.lintText('', { filePath: './test/empty.ts' })
      ).resolves.toStrictEqual([
        expect.objectContaining<Partial<ESLint.ESLint.LintResult>>({
          usedDeprecatedRules: [],
          errorCount: 0,
          fatalErrorCount: 0,
          warningCount: 0
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
          config
            .flatMap(c => Object.keys(c.plugins))
            .map(plugin => determinePluginPackageName(plugin))
        )
      );
    });

    if (config.some(c => c.languageOptions?.parser)) {
      it('lists its parser as a peer dependency', () => {
        expect.hasAssertions();

        const parserPackages = config.flatMap(c => {
          // eslint-disable-next-line jest/no-conditional-in-test
          if (!c.languageOptions?.parser) {
            return [];
          }

          const parser = packagesForParsers.get(c.languageOptions.parser);

          // eslint-disable-next-line jest/no-conditional-in-test
          if (!parser) {
            throw new Error(
              `could not determine what package imports parser used by ${configFile}`
            );
          }

          return [parser];
        });

        expect(Object.keys(packageJson.peerDependencies)).toStrictEqual(
          expect.arrayContaining(parserPackages)
        );
      });
    }

    if (configFile !== 'index.js') {
      it('lists any plugins as optional peer dependencies', () => {
        expect.hasAssertions();

        expect(packageJson.peerDependenciesMeta).toStrictEqual(
          expect.objectContaining(
            Object.fromEntries(
              config
                .flatMap(c => Object.keys(c.plugins))
                .filter(plugin => plugin !== 'prettier')
                .map(plugin => [
                  determinePluginPackageName(plugin),
                  { optional: true }
                ])
            )
          )
        );
      });

      if (config.some(c => c.languageOptions?.parser)) {
        it('lists its parser as an optional peer dependency', () => {
          expect.hasAssertions();

          const parserPackages = config.flatMap(c => {
            // eslint-disable-next-line jest/no-conditional-in-test
            if (!c.languageOptions?.parser) {
              return [];
            }

            const parser = packagesForParsers.get(c.languageOptions.parser);

            // eslint-disable-next-line jest/no-conditional-in-test
            if (!parser) {
              throw new Error(
                `could not determine what package imports parser used by ${configFile}`
              );
            }

            return [parser];
          });

          expect(Object.keys(packageJson.peerDependencies)).toStrictEqual(
            expect.arrayContaining(parserPackages)
          );

          expect(packageJson.peerDependenciesMeta).toStrictEqual(
            expect.objectContaining(
              Object.fromEntries(
                parserPackages.map(parser => [parser, { optional: true }])
              )
            )
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
              config
                .flatMap(c => Object.keys(c.plugins))
                .map(plugin => [
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

        expect(config.some(c => 'prettier/prettier' in c.rules)).toBe(true);
      });

      it('should explicitly set curly', () => {
        expect.hasAssertions();

        expect(config.some(c => 'curly' in c.rules)).toBe(true);
      });
    }
  });
});
