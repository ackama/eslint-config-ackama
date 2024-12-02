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
      'eslint-recommended': ESLint.Linter.LegacyConfig &
        Required<Pick<ESLint.Linter.LegacyConfig, 'overrides'>>;
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

// todo: we need to specify our own types to ensure compatibility with both ESLint v8 and v9
declare module '@typescript-eslint/parser' {
  import * as ESLint from 'eslint';

  const parser: ESLint.ESLint.ObjectMetaProperties &
    (
      | {
          parseForESLint(
            text: string,
            options?: unknown
          ): ESLint.Linter.ESLintParseResult;
        }
      | { parse(text: string, options?: unknown): ESLint.AST.Program }
    );
  export = parser;
}

// todo: these are only typed in v9, which is also where they've been removed...
declare module 'eslint/use-at-your-own-risk' {
  import { ESLint, Linter } from 'eslint';

  type FixType = 'directive' | 'layout' | 'problem' | 'suggestion';

  type CacheStrategy = 'content' | 'metadata';

  interface FlatOptions {
    // File enumeration
    cwd?: string | undefined;
    errorOnUnmatchedPattern?: boolean | undefined;
    globInputPaths?: boolean | undefined;
    ignore?: boolean | undefined;
    ignorePatterns?: string[] | null | undefined;
    passOnNoPatterns?: boolean | undefined;
    warnIgnored?: boolean | undefined;

    // Linting
    allowInlineConfig?: boolean | undefined;
    baseConfig?: Linter.FlatConfig | Linter.FlatConfig[] | null | undefined;
    overrideConfig?: Linter.FlatConfig | Linter.FlatConfig[] | null | undefined;
    overrideConfigFile?: boolean | string | undefined;
    plugins?: Record<string, ESLint.Plugin> | null | undefined;
    ruleFilter?:
      | ((arg: {
          ruleId: string;
          severity: Exclude<Linter.Severity, 0>;
        }) => boolean)
      | undefined;
    stats?: boolean | undefined;

    // Autofix
    fix?: boolean | ((message: Linter.LintMessage) => boolean) | undefined;
    fixTypes?: FixType[] | undefined;

    // Cache-related
    cache?: boolean | undefined;
    cacheLocation?: string | undefined;
    cacheStrategy?: CacheStrategy | undefined;

    // Other Options
    flags?: string[] | undefined;
  }

  type LoadedFormatter = unknown;

  export class FlatESLint {
    public static configType: 'flat';

    public static readonly version: string;

    /**
     * The default configuration that ESLint uses internally. This is provided for tooling that wants to calculate configurations using the same defaults as ESLint.
     * Keep in mind that the default configuration may change from version to version, so you shouldn't rely on any particular keys or values to be present.
     */
    public static readonly defaultConfig: Linter.Config[];

    public static outputFixes(results: ESLint.LintResult[]): Promise<void>;

    public static getErrorResults(
      results: ESLint.LintResult[]
    ): ESLint.LintResult[];

    public constructor(options?: FlatOptions);

    public lintFiles(patterns: string[] | string): Promise<ESLint.LintResult[]>;

    public lintText(
      code: string,
      options?: {
        filePath?: string | undefined;
        warnIgnored?: boolean | undefined;
      }
    ): Promise<ESLint.LintResult[]>;

    public getRulesMetaForResults(
      results: ESLint.LintResult[]
    ): ESLint.LintResultData['rulesMeta'];

    public hasFlag(flag: string): boolean;

    public calculateConfigForFile(filePath: string): Promise<unknown>;

    public findConfigFile(): Promise<string | undefined>;

    public isPathIgnored(filePath: string): Promise<boolean>;

    public loadFormatter(nameOrPath?: string): Promise<LoadedFormatter>;
  }

  interface LegacyOptions {
    // File enumeration
    cwd?: string | undefined;
    errorOnUnmatchedPattern?: boolean | undefined;
    extensions?: string[] | undefined;
    globInputPaths?: boolean | undefined;
    ignore?: boolean | undefined;
    ignorePath?: string | undefined;

    // Linting
    allowInlineConfig?: boolean | undefined;
    baseConfig?: Linter.LegacyConfig | undefined;
    overrideConfig?: Linter.LegacyConfig | undefined;
    overrideConfigFile?: string | undefined;
    plugins?: Record<string, ESLint.Plugin> | undefined;
    reportUnusedDisableDirectives?: Linter.StringSeverity | undefined;
    resolvePluginsRelativeTo?: string | undefined;
    rulePaths?: string[] | undefined;
    useEslintrc?: boolean | undefined;

    // Autofix
    fix?: boolean | ((message: Linter.LintMessage) => boolean) | undefined;
    fixTypes?: FixType[] | undefined;

    // Cache-related
    cache?: boolean | undefined;
    cacheLocation?: string | undefined;
    cacheStrategy?: CacheStrategy | undefined;

    // Other Options
    flags?: string[] | undefined;
  }

  export class LegacyESLint {
    public static configType: 'eslintrc';

    public static readonly version: string;

    public static outputFixes(results: ESLint.LintResult[]): Promise<void>;

    public static getErrorResults(
      results: ESLint.LintResult[]
    ): ESLint.LintResult[];

    public constructor(options?: LegacyOptions);

    public lintFiles(patterns: string[] | string): Promise<ESLint.LintResult[]>;

    public lintText(
      code: string,
      options?: {
        filePath?: string | undefined;
        warnIgnored?: boolean | undefined;
      }
    ): Promise<ESLint.LintResult[]>;

    public getRulesMetaForResults(
      results: ESLint.LintResult[]
    ): ESLint.LintResultData['rulesMeta'];

    public hasFlag(flag: string): false;

    public calculateConfigForFile(filePath: string): Promise<unknown>;

    public isPathIgnored(filePath: string): Promise<boolean>;

    public loadFormatter(nameOrPath?: string): Promise<ESLint.Formatter>;
  }
}
