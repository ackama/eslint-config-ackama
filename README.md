# Ackama ESLint Configuration

Standard ESLint configurations for Ackama projects.

#### Usage

Install this package:

    npm install --save-dev eslint-config-ackama

### Additional Setup

#### `.eslintignore`

The configurations provided in this package specify `ignorePatterns` with common
folders to be ignored as part of best practice, meaning an `.eslintignore` file
is not required.

Projects can use this property themselves instead of an `.eslintignore` to
ignore additional files & folders, using standard ignore-glob syntax:

```js
/** @type {import('eslint').Linter.Config} */
const config = {
  extends: ['ackama'],
  ignorePatterns: ['!.myFile.js', 'test/fixtures', '!test/fixtures/**.ts']
};

module.exports = config;
```

As `ignorePatterns` is merged across all configs being extended from, you can
use `!` to un-ignore entries.

#### @typescript-eslint

The `@typescript-eslint` configuration requires type checking to be setup.

You can do this by making a `tsconfig.eslint.json` with the following:

```json
{
  "extends": "./tsconfig.json",
  "exclude": ["node_modules", "coverage", "public", "build", "dist", "lib"],
  "include": ["bin", "src", "types", "test", "*.ts", "*.tsx", "*.js", "*.jsx"]
}
```

### Environments

ESLint uses the toplevel `env` property to track what variables are available
globally. To reduce potential errors, the configurations provided by this
package deliberately avoid enabling or disabling any envs without good reason.

Currently, the only exception to this is the `es2017` env, since the majority of
projects should be using ES2017 or higher.

As such, it's up to the developer to enable the appropriate envs when setting
eslint up on a project.

In general, the primary ones to know about are

- `node` for NodeJS apps
- `browser` for browser apps
- `commonjs` for browser apps that are bundled using a bundler such as webpack

You'll find a full list of the envs & their use-cases
[here](https://eslint.org/docs/user-guide/configuring#specifying-environments).

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

Note that this option expects a _RegExp string_

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
