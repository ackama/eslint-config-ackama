#!/usr/bin/env node

import { JSONSchemaForNPMPackageJsonFiles } from '@schemastore/package';
import * as child_process from 'child_process';
import * as ESLint from 'eslint';
import * as fs from 'fs';
import { prompt } from 'inquirer';
import * as path from 'path';
import prettier from 'prettier';

/** maps the dependencies that are related to configs */
const depsRelatedToConfigs: Readonly<Record<string, readonly string[]>> = {
  '@typescript-eslint': [
    '@typescript-eslint/eslint-plugin',
    '@typescript-eslint/parser',
    '@babel/preset-typescript',
    'ttypescript',
    'typescript',
    'ts-node',
    'ts-jest',
    'tslint'
  ],
  'flowtype': ['flow-bin', '@babel/preset-flow'],
  'react': ['react', 'react-dom', 'react-jss', '@babel/preset-react'],
  'jest': ['jest', 'ts-jest']
};

const availableConfigs: readonly string[] = Object.keys(depsRelatedToConfigs);

const recommendConfigsBasedOnDependencies = (): string[] => {
  const packageJson: JSONSchemaForNPMPackageJsonFiles = JSON.parse(
    fs.readFileSync('./package.json').toString()
  );

  const deps = Object.keys({
    ...packageJson.dependencies,
    ...packageJson.devDependencies
  });

  return availableConfigs.filter(config =>
    depsRelatedToConfigs[config].some(deps.includes.bind(deps))
  );
};

const recommendedConfigs = recommendConfigsBasedOnDependencies();

const requireConfig = (
  config: string
): Required<Omit<ESLint.Linter.Config, '$schema'>> => {
  // eslint-disable-next-line global-require,@typescript-eslint/no-require-imports,@typescript-eslint/no-var-requires
  const requiredConfig: ESLint.Linter.Config = require(config);

  return {
    root: true,
    reportUnusedDisableDirectives: false,
    noInlineConfig: false,
    parser: '',
    processor: '',
    parserOptions: {},
    ignorePatterns: [],
    env: {},
    settings: {},
    globals: {},
    extends: [],
    plugins: [],
    overrides: [],
    rules: {},
    ...requiredConfig
  };
};

/**
 * Determines the canonical package name for the given eslint `plugin`,
 * that can be used to install the plugin using a package manager.
 *
 * Generally this is done by returning the plugin name with `eslint-plugin-`
 * appended to it (if the name does not already start with that string).
 *
 * Scoped plugins must be explicitly checked for to handle properly;
 * Currently the `@typescript-eslint` is the only supported scoped plugin.
 *
 * @param {string} plugin
 *
 * @return {string}
 */
const determinePluginPackageName = (plugin: string): string => {
  if (plugin.startsWith('eslint-plugin-')) {
    return plugin;
  }

  if (plugin === '@typescript-eslint') {
    return `${plugin}/eslint-plugin`;
  }

  return `eslint-plugin-${plugin}`;
};

/**
 * Determines the dependencies that need to be installed to use the
 * given lint config, based on the plugins & parser that it specifies.
 *
 * @param {string} configName
 *
 * @return {string[]}
 */
const determineConfigDependencies = (configName: string): string[] => {
  const configFile = requireConfig(
    path.join(__dirname, '..', `${configName}.js`)
  );
  const deps = configFile.plugins.map(determinePluginPackageName);

  if (configFile.parser) {
    deps.push(configFile.parser);
  }

  return deps;
};

/**
 * Determines what dependencies need to be installed to use the given lint
 * configs, and including base dependencies such as `eslint` that are required
 * by all configs.
 *
 * @param {string[]} configs
 *
 * @return {string[]}
 */
const determineDependenciesToInstall = (configs: readonly string[]): string[] =>
  Array.from(
    new Set<string>(
      [
        'eslint',
        'eslint-config-ackama',
        'prettier',
        'prettier-config-ackama'
      ].concat(...configs.map(determineConfigDependencies))
    ).values()
  );

/**
 * Installs the given `devDependencies` using the appropriate package manager
 * for the project.
 *
 * `npm` is used unless a `yarn.lock` is found, in which case `yarn` is used.
 *
 * @param {string[]} devDependencies
 */
const installDevDependencies = (devDependencies: readonly string[]): void => {
  const command = fs.existsSync('yarn.lock') ? 'yarn' : 'npm';
  const args = [
    command === 'yarn' ? 'add' : 'install',
    '-D',
    ...devDependencies
  ];

  child_process.spawnSync(command, args, { stdio: 'inherit' });
};

const writePrettyFile = (filepath: string, contents: string): void => {
  fs.writeFileSync(
    filepath,
    prettier.format(
      contents, // eslint-disable-next-line @typescript-eslint/no-require-imports,global-require
      { ...require('prettier-config-ackama'), filepath }
    )
  );
};

const writePrettyJson = <T extends object>(name: string, contents: T): void => {
  writePrettyFile(name, JSON.stringify(contents));
};

const createTSConfigForLinting = (): void => {
  if (!fs.existsSync('tsconfig.eslint.json')) {
    console.log(
      'skipping creation of tsconfig.eslint.json as one already exists'
    );

    return;
  }

  writePrettyJson('tsconfig.eslint.json', {
    extends: './tsconfig.json',
    files: ['.eslintrc.js'],
    exclude: ['coverage', 'node_modules', 'vendor', 'bundle'],
    include: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx']
  });

  console.log('created tsconfig.eslint.json for linting');
};

/**
 * Creates a new `.eslintrc.js` to use the given `configs`,
 * overriding if one already exists.
 *
 * @param {readonly string[]} configs
 */
const createEslintConfig = (configs: readonly string[]): void => {
  const superConfig = configs
    .map(name => requireConfig(path.join(__dirname, '..', `${name}.js`)))
    .reduce<
      Required<
        Pick<
          ESLint.Linter.Config,
          | 'parserOptions'
          | 'settings' //
          | 'extends'
          | 'parser'
        >
      >
    >(
      (superConf, config) => ({
        parser: config.parser || superConf.parser,
        parserOptions: { ...superConf.parserOptions, ...config.parserOptions },
        settings: { ...superConf.settings, ...config.settings },
        extends: superConf.extends
      }),
      {
        parser: '',
        parserOptions: {},
        settings: {},
        extends: configs.map(name =>
          name === 'index' ? 'ackama' : `ackama/${name}`
        )
      }
    );

  if (superConfig.parser.startsWith('@typescript-eslint')) {
    createTSConfigForLinting();

    superConfig.parserOptions = {
      project: 'tsconfig.eslint.json',
      ...superConfig.parserOptions
    };
  }

  const configMiddle = Object.entries(superConfig)
    .filter(([, value]) => value)
    .map(([key, value]) => `${key}: ${JSON.stringify(value, null, 2)}`)
    .join(',');

  writePrettyFile(
    '.eslintrc.js',
    `
      /* eslint-env node */

      /** @type {import('eslint').Linter.Config} */
      const config = {
      ${configMiddle}
      };

      module.exports = config;
    `
  );

  try {
    fs.unlinkSync('.eslintrc');
    fs.unlinkSync('.eslintrc.json');
  } catch {
    // just in case
  }
};

/**
 * Updates the `package.json` of the project with the prettier config, and lint script.
 * Afterwards, `sort-package-json` is called via `npx` to sort the package json.
 */
const updatePackageJson = (): void => {
  const packageJson: JSONSchemaForNPMPackageJsonFiles = JSON.parse(
    fs.readFileSync('./package.json').toString()
  );

  // our config handles this, so it can be removed from top-level deps
  delete packageJson.devDependencies?.['eslint-config-prettier'];

  writePrettyJson<JSONSchemaForNPMPackageJsonFiles>('package.json', {
    ...packageJson,
    prettier: 'prettier-config-ackama',
    scripts: {
      ...packageJson.scripts,
      'lint': 'eslint . --ext js,jsx,ts,tsx',
      'lint-fix': 'eslint . --ext js,jsx,ts,tsx --fix'
    }
  });

  // use npx to avoid having to carry this around as a dep - local version will be used if installed anyway
  child_process.spawnSync('npx', ['sort-package-json'], { stdio: 'inherit' });
};

const createEslintIgnore = (): void => {
  fs.writeFileSync(
    '.eslintignore',
    `
/node_modules/
/coverage/
/bundle/
/vendor/
/public/
/dist/
/lib/
/out/
!.eslintrc.js
`.trimStart()
  );
};

Promise.resolve()
  .then(() => {
    if (!process.stdin.isTTY) {
      console.warn('process is not running in a TTY - assuming default ');
    }

    return prompt<{ configs: string[] }>({
      name: 'configs',
      type: 'checkbox',
      default: recommendedConfigs,
      choices: availableConfigs,
      message: 'hello world'
    });
  })
  .then(({ configs }) => {
    const configsPlusIndex = ['index'].concat(configs);

    console.log('Updating package.json...');
    updatePackageJson();

    console.log('Calculating dependencies...');
    const deps = determineDependenciesToInstall(configsPlusIndex);

    console.log('Installing dependencies...');
    installDevDependencies(deps);

    console.log('Creating .eslintrc.js...');
    createEslintConfig(configsPlusIndex);

    console.log('Creating .eslintignore...');
    createEslintIgnore();
  })
  .catch(console.error);
