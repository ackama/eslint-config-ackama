import ESLint from 'eslint';
import fs from 'fs';

// eslint-disable-next-line n/no-sync
export const configFiles = fs
  .readdirSync('.', { withFileTypes: true })
  .filter(
    value =>
      value.isFile() &&
      value.name.endsWith('.js') &&
      !value.name.startsWith('eslint.config.')
  )
  .map(value => value.name);

// eslint-disable-next-line n/no-sync
export const typeDeclarations = fs.readFileSync('configs.d.ts', 'utf8');

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
export const determinePluginPackageName = (plugin: string): string => {
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

export const makeEnabledRulesWarn = (
  value: ESLint.Linter.RuleEntry
): ESLint.Linter.RuleEntry => {
  if (Array.isArray(value)) {
    return [
      value[0] !== 'off' && value[0] !== 0 ? 'warn' : 'off',
      ...(value.slice(1) as unknown[])
    ];
  }

  return value !== 'off' && value !== 0 ? 'warn' : 'off';
};
