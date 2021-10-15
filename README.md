# Ackama ESLint Configuration

Standard ESLint configurations for Ackama projects.

#### Basic Setup

Install this package & the required plugins:

    npm install --save-dev eslint-config-ackama @types/eslint eslint eslint-plugin-eslint-comments eslint-plugin-import eslint-plugin-node eslint-plugin-prettier prettier

Add an `.eslintrc.js` to your repo that extends from this config:

```js
/** @type {import('eslint').Linter.Config} */
const config = {
  extends: ['ackama']
};

module.exports = config;
```

You'll want to tell ESLint about the environment you're working in using the
[`env`](https://eslint.org/docs/user-guide/configuring#specifying-environments)
toplevel property.

To reduce potential errors, the configurations provided by this package
deliberately avoid enabling or disabling any envs without good reason, opting to
set only the `es2017` env, since the majority of projects should be using ES2017
or higher.

These are the three most common envs you'll want to use:

- `node` for NodeJS apps
- `browser` for browser apps
- `commonjs` for browser apps that are bundled using a bundler such as webpack

You can also add a `lint` script to the `scripts` property in your apps
`package.json` to make it easier for developers to run eslint against the app:

```json
{
  "scripts": {
    "lint": "eslint . --ext js,jsx,ts,tsx"
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
  - `eslint-plugin-eslint-comments`
  - `eslint-plugin-prettier`
  - `eslint-plugin-import`
  - `eslint-plugin-node`
- `ackama/@typescript-eslint`
  - `@typescript-eslint/eslint-plugin`
  - `@typescript-eslint/parser`
- `ackama/flowtype`
  - `eslint-plugin-flowtype`
  - `@babel/eslint-parser`
- `ackama/jest`
  - `eslint-plugin-jest`
  - `eslint-plugin-jest-formatting`
- `ackama/react`
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

This can be done using the
[`ignorePatterns`](https://eslint.org/docs/user-guide/configuring#ignorepatterns-in-config-files)
toplevel property, which is an array that accepts `.gitignore` glob-like
strings:

```js
/** @type {import('eslint').Linter.Config} */
const config = {
  ignorePatterns: ['!public/', 'tmp/']
};

module.exports = config;
```

### Typical complete example

Here's what a typical `.eslintrc.js` would look like for a TypeScript project
that uses `jest` & `react`:

```js
/** @type {import('eslint').Linter.Config} */
const config = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    ecmaVersion: 2019,
    sourceType: 'module'
  },
  env: { commonjs: true },
  extends: ['ackama', 'ackama/@typescript-eslint', 'ackama/react'],
  ignorePatterns: ['coverage', 'lib', 'infra'],
  overrides: [
    {
      files: ['test/**'],
      extends: ['ackama/jest'],
      rules: { 'jest/prefer-expect-assertions': 'off' }
    }
  ],
  rules: {}
};

module.exports = config;
```

Note the use of `overrides` to target specific files for the `ackama/jest`
config. This is not a requirement, but can help reduce the changes of false
positives.

### Notes & Considerations

While the majority of rules enabled by these configurations are sound, a few
have edge cases or are potentially not as suitable as initially hoped.

Some of these edge cases are already well-known, and may have possible fixes in
the future; the details of these rules are documented below.

In general, we are more acceptance of rules that don't catch everything than
rules that report too many false positives.

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
[semantically](https://github.com/semantic-release/semantic-release).

#### Contributing

This repo uses
[convectional commits](https://www.conventionalcommits.org/en/v1.0.0/) to enable
semantic releases & changelog generation.

When making a PR, `Semantic Pull Request` will check if the PR will trigger a
release, based on the title & commits in the PR.

This is done via a status check, which will pass if a release would be triggered
by merging. _You are can merge regardless of if this status check passes or
not._

Please keep in mind that if you're denoting a release via the PRs title, you
will have to squashed. `SPR` will inform you if you should merge or squash.
