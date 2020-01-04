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
