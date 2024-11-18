# Ackama ESLint Configuration

Standard ESLint configurations for Ackama projects.

#### Basic Setup

Install this package & the required plugins:

    npm install --save-dev eslint-config-ackama @types/eslint @eslint-community/eslint-plugin-eslint-comments @eslint/js @stylistic/eslint-plugin-js eslint eslint-plugin-import eslint-plugin-n eslint-plugin-prettier prettier

Add an `eslint.config.js` to your repo that imports this config:

```js
const configAckamaBase = require('eslint-config-ackama');

/** @type {import('eslint').Linter.FlatConfig[]} */
const config = [
  { files: ['**/*.{js,jsx,cjs,mjs,ts,tsx,cts,mts}'] },
  .../** @type {import('eslint').Linter.FlatConfig[]} */ (configAckamaBase)
];

module.exports = config;
```

To reduce potential errors, the configurations provided by this package
deliberately avoid making assumptions about the environment you're working in,
meaning you will need to configure what globals are available using the
`globals` package:

```js
const configAckamaBase = require('eslint-config-ackama');
const globals = require('globals');

/** @type {import('eslint').Linter.FlatConfig[]} */
const config = [
  { files: ['**/*.{js,jsx,cjs,mjs,ts,tsx,cts,mts}'] },
  .../** @type {import('eslint').Linter.FlatConfig[]} */ (configAckamaBase),
  {
    languageOptions: {
      globals: {
        ...globals.node, // for NodeJS apps
        ...globals.browser, // for browser apps
        ...globals.commonjs // for browser apps that are bundled using a bundler such as webpack
      }
    }
  }
];

module.exports = config;
```

> [!NOTE]
>
> The legacy configuration set the `es2017` env by default, since the majority
> of projects should be using ES2017 or higher.
>
> The equivalent to this in the flat configuration format is the
> `languageOptions.ecmaVersion` property, which defaults to `latest` meaning you
> don't need to set it unless you're using a different version of ECMAScript.

You can also add a `lint` script to the `scripts` property in your apps
`package.json` to make it easier for developers to run eslint against the app:

```json
{
  "scripts": {
    "lint": "eslint"
  }
}
```

This can be called via `npm run lint` or `yarn run lint`, depending on the
package manager you're using.

#### Additional Configs

In addition to the `ackama` config (which pulls in `index.js`) for vanilla
Javascript, this config package ships with a number of other configs for linting
specific packages and frameworks.

You can use these by extending them by their names in the same way as the base
config, except you must prefix them with `ackama/`. You will also be required to
install any extra plugins and dependencies these configs require that are not
required for the base config.

Below is a complete list of the configs provided, and their dependencies:

<!-- begin configs list -->

- `ackama`
  - `@eslint-community/eslint-plugin-eslint-comments`
  - `@stylistic/eslint-plugin-js`
  - `eslint-plugin-prettier`
  - `eslint-plugin-import`
  - `eslint-plugin-n`
- `ackama/@typescript-eslint`
  - `@typescript-eslint/parser`
  - `@typescript-eslint/eslint-plugin`
  - `@stylistic/eslint-plugin-ts`
  - `eslint-plugin-prettier`
- `ackama/jest`
  - `eslint-plugin-jest`
- `ackama/react`
  - `eslint-plugin-prettier`
  - `eslint-plugin-react`
  - `eslint-plugin-react-hooks`
  - `eslint-plugin-jsx-a11y`

<!-- end configs list -->

### Ignoring files

Often there are files and folders that you don't want ESLint to check. While the
base config already setups ignores for common folders, including `node_modules`,
`vendor`, `coverage`, `lib`, `out`, and a few more, unique projects might need
to ignore additional folders, or inversely might want to un-ignore a preset
ignore.

This can be done by
[including a configuration object with just an `ignores` key](https://eslint.org/docs/latest/use/configure/ignore),
making it act as a global ignore:

```js
const configAckamaBase = require('eslint-config-ackama');

/** @type {import('eslint').Linter.FlatConfig[]} */
const config = [
  { files: ['**/*.{js,jsx,cjs,mjs,ts,tsx,cts,mts}'] },
  { ignores: ['infra'] },
  .../** @type {import('eslint').Linter.FlatConfig[]} */ (configAckamaBase)
];

module.exports = config;
```

### Typical complete example

Here's what a typical `eslint.config.js` would look like for a TypeScript
project that uses `jest` & `react`:

```js
const configAckamaBase = require('eslint-config-ackama');
const configAckamaTypeScript = require('eslint-config-ackama/@typescript-eslint');
const configAckamaJest = require('eslint-config-ackama/jest');
const configAckamaReact = require('eslint-config-ackama/react');
const globals = require('globals');

/** @type {import('eslint').Linter.FlatConfig[]} */
const config = [
  { files: ['**/*.{js,jsx,cjs,mjs,ts,tsx,cts,mts}'] },
  { ignores: ['infra'] },
  .../** @type {import('eslint').Linter.FlatConfig[]} */ (configAckamaBase),
  .../** @type {import('eslint').Linter.FlatConfig[]} */ (
    configAckamaTypeScript
  ),
  {
    languageOptions: {
      parserOptions: { projectService: true },
      globals: globals.commonjs
    }
  },
  .../** @type {import('eslint').Linter.FlatConfig[]} */ (configAckamaReact),
  ...[
    .../** @type {import('eslint').Linter.FlatConfig[]} */ (configAckamaJest),
    /** @type {import('eslint').Linter.FlatConfig} */ ({
      rules: { 'jest/prefer-expect-assertions': 'off' }
    })
  ].map(c => ({ ...c, files: ['test/**'] })),
  {
    files: ['**/*.js'],
    languageOptions: { sourceType: 'script' },
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
      '@typescript-eslint/no-var-requires': 'off'
    }
  }
];

module.exports = config;
```

### Notes & Considerations

While the majority of rules enabled by these configurations are sound, a few
have edge cases or are potentially not as suitable as initially hoped.

Some of these edge cases are already well-known, and may have possible fixes in
the future; the details of these rules are documented below.

In general, we are more acceptance of rules that don't catch everything than
rules that report too many false positives.

#### Usage with legacy ESLint configurations

Officially configurations are now exported as flat configuration objects which
can only be used with the
["flat config"](https://eslint.org/blog/2022/08/new-config-system-part-2/)
system introduced in ESLint v8.23.0, since that is required to be able to move
beyond ESLint v8 so codebases should be migrating to that system.

Unofficially however, since the upgrade involves replacing a number of plugins
unrelated to flat configuration, the configurations will export a legacy
configuration if the `ESLINT_USE_FLAT_CONFIG` environment variable is set to
`false`.

> [!NOTE]
>
> This environment variable is also what tells ESLint v9 to use the legacy
> configuration format.

This allows complex codebases to handle the upgrade as a two-step process: first
upgrading to the latest version of ESLint and the new plugins, and then
upgrading to the flat configuration system.

This legacy configuration will be removed in the next major if not sooner, so
should not be relied on beyond the upgrade process.

#### React: Lint custom hooks that accept a dependency array

If you create a custom hook for a project that takes a dependency array, you can
have `react-hooks/exhaustive-deps` lint it in the same manner as core hooks by
passing it the name of your custom hook via its `additionalHooks` option:

```json
{
  "rules": {
    "react-hooks/exhaustive-deps": ["warn", { "additionalHooks": "useHook" }]
  }
}
```

Note that this option expects a _RegExp string_.

### Versioning

Versioning is modeled after [semantic versioning](https://semver.org/); however,
since these configurations are for a code quality tool meaning just about every
change to a config is likely going to result in a new error in at least one of
our codebases (and so arguably be a breaking change), we consider general
configuration changes to be _minor features_, and release them as such.

In addition to this covering changes like enabling a new rule and adjusting the
configuration of an already-enabled rule, this also includes updating to new
major versions of a plugin which might have removed or renamed rules used in our
configs.

We specify which versions of plugins is expected by our configs as optional peer
dependencies, meaning your package manager should warn you if a minor version of
our package requires a related plugin to be updated for compatibility.

Major versions are generally reserved for when we're making a significant number
of changes, which can be common with new major versions of ESLint that have
significant breaking changes that require the surrounding ecosystem to release
new major versions.

### Releasing

Releases are handled using
[semantic release](https://github.com/semantic-release/semantic-release), which
is run on `main` and releases versions based on
[the commit messages](https://semantic-release.gitbook.io/semantic-release#commit-message-format).

#### Contributing

This repo uses
[conventional commits](https://www.conventionalcommits.org/en/v1.0.0/) to enable
semantic releases & changelog generation, which requires that commits on the
`main` branch follow that format.

As we squash our pull requests when merging by default, you should ideally use
title your pull requests using the conventional commit format since that will be
used as the commit message for the squashed commit.

We run `commitlint` on pull requests to ensure that commit messages follow the
format - while not strictly required when the commits will be squashed, it can
help ensure you're following the format correctly.
