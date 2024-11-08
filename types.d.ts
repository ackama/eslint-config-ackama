// todo: see https://github.com/eslint-community/eslint-plugin-eslint-comments/pull/246
declare module '@eslint-community/eslint-plugin-eslint-comments/configs' {
  import * as ESLint from 'eslint';

  const configs: {
    recommended: ESLint.Linter.FlatConfig & {
      plugins: {
        '@eslint-community/eslint-plugin-eslint-comments': ESLint.ESLint.Plugin;
      };
    };
  };
  export = configs;
}

// todo: see https://github.com/import-js/eslint-plugin-import/pull/3097
declare module 'eslint-plugin-import' {
  import * as ESLint from 'eslint';

  const plugin: ESLint.ESLint.Plugin & {
    configs: {
      'recommended': ESLint.Linter.LegacyConfig;
      'errors': ESLint.Linter.LegacyConfig;
      'warnings': ESLint.Linter.LegacyConfig;
      'stage-0': ESLint.Linter.LegacyConfig;
      'react': ESLint.Linter.LegacyConfig;
      'react-native': ESLint.Linter.LegacyConfig;
      'electron': ESLint.Linter.LegacyConfig;
      'typescript': ESLint.Linter.LegacyConfig;
    };

    flatConfigs: {
      'recommended': ESLint.Linter.FlatConfig;
      'errors': ESLint.Linter.FlatConfig;
      'warnings': ESLint.Linter.FlatConfig;
      'stage-0': ESLint.Linter.FlatConfig;
      'react': ESLint.Linter.FlatConfig;
      'react-native': ESLint.Linter.FlatConfig;
      'electron': ESLint.Linter.FlatConfig;
      'typescript': ESLint.Linter.FlatConfig;
    };
  };
  export = plugin;
}

// todo: while @stylistic/eslint-plugin-js provides its own types, they error for some reason
//   see https://github.com/eslint-stylistic/eslint-stylistic/issues/481
declare module '@stylistic/eslint-plugin-js' {
  import * as ESLint from 'eslint';

  const plugin: ESLint.ESLint.Plugin;
  export = plugin;
}

// todo: while @stylistic/eslint-plugin-ts provides its own types, they error for some reason
//   see https://github.com/eslint-stylistic/eslint-stylistic/issues/481
declare module '@stylistic/eslint-plugin-ts' {
  import * as ESLint from 'eslint';

  const plugin: ESLint.ESLint.Plugin;
  export = plugin;
}

// todo: while eslint-plugin-react provides its own types, they are very broken
//   see https://github.com/jsx-eslint/eslint-plugin-react/issues/3838
declare module 'eslint-plugin-react' {
  import * as ESLint from 'eslint';

  const plugin: ESLint.ESLint.Plugin & {
    configs: {
      flat: Record<
        'all' | 'jsx-runtime' | 'recommended',
        ESLint.Linter.FlatConfig
      >;
    };
  };
  export = plugin;
}

declare module 'eslint-plugin-react-hooks' {
  import * as ESLint from 'eslint';

  const plugin: ESLint.ESLint.Plugin & {
    configs: {
      recommended: ESLint.Linter.LegacyConfig;
    };
  };
  export = plugin;
}

// todo: has its own types, but requires `node16` module resolution which breaks other things
declare module '@typescript-eslint/eslint-plugin' {
  import * as ESLint from 'eslint';

  const plugin: ESLint.ESLint.Plugin & {
    configs: {
      'all': ESLint.Linter.LegacyConfig;
      'base': ESLint.Linter.LegacyConfig;
      'disable-type-checked': ESLint.Linter.LegacyConfig;
      'eslint-recommended': ESLint.Linter.LegacyConfig;
      'recommended': ESLint.Linter.LegacyConfig;
      /** @deprecated - please use "recommended-type-checked" instead. */
      'recommended-requiring-type-checking': ESLint.Linter.LegacyConfig;
      'recommended-type-checked': ESLint.Linter.LegacyConfig;
      'recommended-type-checked-only': ESLint.Linter.LegacyConfig;
      'strict': ESLint.Linter.LegacyConfig;
      'strict-type-checked': ESLint.Linter.LegacyConfig;
      'strict-type-checked-only': ESLint.Linter.LegacyConfig;
      'stylistic': ESLint.Linter.LegacyConfig;
      'stylistic-type-checked': ESLint.Linter.LegacyConfig;
      'stylistic-type-checked-only': ESLint.Linter.LegacyConfig;
    };
  };
  export = plugin;
}

// todo: doesn't get its own types until v8
declare module '@typescript-eslint/parser' {
  import * as ESLint from 'eslint';

  const parser: ESLint.Linter.ParserModule;
  export = parser;
}
