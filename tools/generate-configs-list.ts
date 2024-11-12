#!/usr/bin/env ts-node-transpile-only

process.env.ESLINT_USE_FLAT_CONFIG = 'false';

import * as ESLint from 'eslint';
import { promises as fs } from 'fs';
import * as path from 'path';
import prettier, { Options } from 'prettier';
import {
  files,
  peerDependencies,
  peerDependenciesMeta,
  prettier as prettierConfigPackage
} from '../package.json';
import { determinePluginPackageName } from '../test/helpers';

// eslint-disable-next-line @typescript-eslint/no-require-imports,n/global-require,@typescript-eslint/no-var-requires
const prettierConfig = require(prettierConfigPackage) as Options;

const requireConfig = (
  config: string
): Required<ESLint.Linter.LegacyConfig> => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports,n/global-require,@typescript-eslint/no-var-requires
  const requiredConfig = require(config) as ESLint.Linter.LegacyConfig;

  return {
    $schema: '',
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
    deps.unshift(configFile.parser);
  }

  return deps;
};

const configs = files
  .filter(config => config.endsWith('.js'))
  .sort((a, b) => (a === 'index.js' ? -1 : a.localeCompare(b)))
  .map(config => path.parse(config).name)
  .flatMap(name => [
    `- \`ackama${name === 'index' ? '' : `/${name}`}\``,
    ...determineConfigDependencies(name).map(
      dependency => `  - \`${dependency}\``
    )
  ])
  .join('\n');

type PeerDependenciesMeta = Record<string, { optional?: boolean }>;

const determineRequiredPeerDependencies = (): string[] => {
  return Object.keys(peerDependencies).filter(dep => {
    if (dep in peerDependenciesMeta) {
      return !(peerDependenciesMeta as PeerDependenciesMeta)[dep].optional;
    }

    return true;
  });
};

const updateInstallLine = (readme: string): string => {
  const npmInstallLine = '    npm install --save-dev';
  const dependenciesToInstall = [
    'eslint-config-ackama',
    '@types/eslint'
  ].concat(determineRequiredPeerDependencies());

  return readme.replace(
    new RegExp(`${npmInstallLine} .*\n`, 'u'),
    [npmInstallLine, ...dependenciesToInstall].join(' ')
  );
};

(async () => {
  const pathToReadme = path.resolve(__dirname, '../README.md');
  const readme = updateInstallLine(await fs.readFile(pathToReadme, 'utf8'));

  const listBeginMarker = `<!-- begin configs list -->`;
  const listEndMarker = `<!-- end configs list -->`;

  const listStartIndex = readme.indexOf(listBeginMarker);
  const listEndIndex = readme.indexOf(listEndMarker);

  if (listStartIndex === -1 || listEndIndex === -1) {
    throw new Error(`cannot find start or end of configs list`);
  }

  await fs.writeFile(
    pathToReadme,
    await prettier.format(
      [
        readme.substring(0, listStartIndex - 1),
        listBeginMarker,
        '',
        configs,
        '',
        readme.substring(listEndIndex)
      ].join('\n'),
      { ...prettierConfig, parser: 'markdown' }
    ),
    'utf8'
  );
})().catch(console.error);
