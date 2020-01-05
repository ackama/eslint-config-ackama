# Ackama ESLint Configuration

Standard ESLint configurations for Ackama projects.

#### Usage

Install this package:

    npm install --save-dev eslint-config-ackama

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
