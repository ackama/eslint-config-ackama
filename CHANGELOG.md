## [2.2.1](https://github.com/ackama/eslint-config-ackama/compare/v2.2.0...v2.2.1) (2021-10-16)


### Bug Fixes

* **deps:** update dependency eslint-config-prettier to v8 ([#76](https://github.com/ackama/eslint-config-ackama/issues/76)) ([708e436](https://github.com/ackama/eslint-config-ackama/commit/708e436823a583420d9515d34b42362ee52af93a))

# [2.2.0](https://github.com/ackama/eslint-config-ackama/compare/v2.1.2...v2.2.0) (2021-08-11)


### Features

* **jest:** use enhanced version of `unbound-method` rule ([#146](https://github.com/ackama/eslint-config-ackama/issues/146)) ([9357d36](https://github.com/ackama/eslint-config-ackama/commit/9357d36de5e8cca90d31cc1b6447ea5ceb03e862))

## [2.1.2](https://github.com/ackama/eslint-config-ackama/compare/v2.1.1...v2.1.2) (2021-04-29)


### Bug Fixes

* bring quote props rule inline with prettier config ([#101](https://github.com/ackama/eslint-config-ackama/issues/101)) ([98b448b](https://github.com/ackama/eslint-config-ackama/commit/98b448bc2a0b8a9d481a680b25e7e8ad799c28f2))

## [2.1.1](https://github.com/ackama/eslint-config-ackama/compare/v2.1.0...v2.1.1) (2021-04-26)


### Bug Fixes

* **flowtype:** switch to `@babel/eslint-parser` ([#98](https://github.com/ackama/eslint-config-ackama/issues/98)) ([09bc833](https://github.com/ackama/eslint-config-ackama/commit/09bc833d8f8ee5c14f1380a9816b293ca6fd67e9))

# [2.1.0](https://github.com/ackama/eslint-config-ackama/compare/v2.0.1...v2.1.0) (2021-02-18)


### Features

* **react:** make `jsx-no-bind` `warn` instead of `error` ([#75](https://github.com/ackama/eslint-config-ackama/issues/75)) ([c570c76](https://github.com/ackama/eslint-config-ackama/commit/c570c761b6ae968f7c6cbeac9a80d33f6206f68f))

## [2.0.1](https://github.com/ackama/eslint-config-ackama/compare/v2.0.0...v2.0.1) (2020-10-22)


### Bug Fixes

* **@typescript-eslint:** remove `interface-name-prefix` rule ([e1c5271](https://github.com/ackama/eslint-config-ackama/commit/e1c527185b34f72fb52d7d4330a420d4ac4e4260))

# [2.0.0](https://github.com/ackama/eslint-config-ackama/compare/v1.7.2...v2.0.0) (2020-09-11)


### Features

* upgrade to eslint 7 ([44b916d](https://github.com/ackama/eslint-config-ackama/commit/44b916d82e80e7fe6378900bf92b1949b4d5a85b))


### BREAKING CHANGES

* require `eslint` 7 or higher
* require `prettier` 2 or higher
* require `@typescript-eslint` 4 or higher
* require `eslint-plugin-jest` 24 or higher
* require `eslint-plugin-jest-formatting` 2 or higher
* require `eslint-plugin-flowtype` 5 or higher
* require `eslint-plugin-node`

## [1.7.2](https://github.com/ackama/eslint-config-ackama/compare/v1.7.1...v1.7.2) (2020-08-13)


### Bug Fixes

* don't ignore parent dirs, to allow for negation globs ([3192bd1](https://github.com/ackama/eslint-config-ackama/commit/3192bd1ffb7861a2e5814c93472ab1eaf331e995))

## [1.7.1](https://github.com/ackama/eslint-config-ackama/compare/v1.7.0...v1.7.1) (2020-07-28)


### Bug Fixes

* specify `eslint-plugin-import` as `peerDependencies` ([46ef44a](https://github.com/ackama/eslint-config-ackama/commit/46ef44a859c856cd4058eec47de5c712648604aa))

# [1.7.0](https://github.com/ackama/eslint-config-ackama/compare/v1.6.0...v1.7.0) (2020-07-20)


### Features

* use `ignorePatterns` in configs instead of `.eslintignore` ([4420a9b](https://github.com/ackama/eslint-config-ackama/commit/4420a9b5e19825f74fe80b2f0df50bed64a1299e))

# [1.6.0](https://github.com/ackama/eslint-config-ackama/compare/v1.5.0...v1.6.0) (2020-07-05)


### Features

* **@typescript-eslint:** enable `exceptAfterSingleLine` option ([419725d](https://github.com/ackama/eslint-config-ackama/commit/419725dd91da2cd4017ee82667bbc6b2ef691128))
* **javascript:** enable `exceptAfterSingleLine` option ([edd25f9](https://github.com/ackama/eslint-config-ackama/commit/edd25f93df9e0bc265db6c4ee8cd651333700834))

# [1.5.0](https://github.com/ackama/eslint-config-ackama/compare/v1.4.2...v1.5.0) (2020-06-26)


### Bug Fixes

* **@typescript-eslint:** replace deprecated rules ([81291c3](https://github.com/ackama/eslint-config-ackama/commit/81291c3c2e58333bf6337d6d41f212eb1084ebad))
* **jest:** replace deprecated rules ([193d6e1](https://github.com/ackama/eslint-config-ackama/commit/193d6e1f71fb11b70a25b8cb78932b111dda2e9f))


### Features

* **@typescript-eslint:** enable `lines-between-class-members` ([b933691](https://github.com/ackama/eslint-config-ackama/commit/b9336913e91285b95aad241b0c820a59b1e06868))
* **@typescript-eslint:** enable `no-unsafe-assignment` ([d9526b9](https://github.com/ackama/eslint-config-ackama/commit/d9526b935fc67d93fdd233c757ff58f26b73eab8))
* **@typescript-eslint:** enable `prefer-reduce-type-parameter` ([e7d8832](https://github.com/ackama/eslint-config-ackama/commit/e7d8832bafbe3d678c931619dc59df8a7aa06fc1))
* **@typescript-eslint:** enable `prefer-ts-expect-error` ([10bbc22](https://github.com/ackama/eslint-config-ackama/commit/10bbc223ed7124f3f4a5a29673ff75ef482937dd))
* **javascript:** always require a newline between class members ([fefb98d](https://github.com/ackama/eslint-config-ackama/commit/fefb98d42159e522f96a327058aa890ac5a9ced2))
* **jest:** add `eslint-plugin-jest-formatting` ([c87a4f8](https://github.com/ackama/eslint-config-ackama/commit/c87a4f805ed6954798e2afbf092e175544086e4a))
* **jest:** enable `ignoreTopLevelDescribe` for `lowercase-name` ([f4650a5](https://github.com/ackama/eslint-config-ackama/commit/f4650a5b86593c8e05d7a2cb0aed6c9ddda5031e))
* **jest:** enable `no-conditional-expect` ([4929337](https://github.com/ackama/eslint-config-ackama/commit/4929337234d53f6314a47925a50cc9dc685885a2))
* **jest:** enable `no-deprecated-functions` ([1368a62](https://github.com/ackama/eslint-config-ackama/commit/1368a62e0dd678da0f437d2dbb217238c0049a83))

## [1.4.2](https://github.com/ackama/eslint-config-ackama/compare/v1.4.1...v1.4.2) (2020-05-24)


### Bug Fixes

* **javascript:** group `index` with `parent` & `sibling` when ordering ([b8c299e](https://github.com/ackama/eslint-config-ackama/commit/b8c299e98195614638a8e63331f65a3b106d360f))

## [1.4.1](https://github.com/ackama/eslint-config-ackama/compare/v1.4.0...v1.4.1) (2020-05-24)


### Bug Fixes

* **@typescript-eslint:** disable `method-signature-style` ([5c73f45](https://github.com/ackama/eslint-config-ackama/commit/5c73f4501a587c52440a0074f4402c37b0579f16))

# [1.4.0](https://github.com/ackama/eslint-config-ackama/compare/v1.3.0...v1.4.0) (2020-04-07)


### Features

* **@typescript-eslint:** enable `method-signature-style` rule ([e0ca7cc](https://github.com/ackama/eslint-config-ackama/commit/e0ca7cc7d1db318d672b758ec6b6f69c6a62024f))
* **@typescript-eslint:** enable new `no-unsafe-<subject>` rules ([fb70bb9](https://github.com/ackama/eslint-config-ackama/commit/fb70bb9863101f2d08c4a30d394fe3d474ef267a))

# [1.3.0](https://github.com/ackama/eslint-config-ackama/compare/v1.2.3...v1.3.0) (2020-02-21)


### Bug Fixes

* **@typescript-eslint:** add default name formats ([b7b1168](https://github.com/ackama/eslint-config-ackama/commit/b7b1168c0535b43267beb3f5b022a84e46adf84a))
* **@typescript-eslint:** allow leading underscores for parameters ([e82c398](https://github.com/ackama/eslint-config-ackama/commit/e82c398a90369c6072a31b5fb42a3a3d1b4f2ae4))
* **@typescript-eslint:** allow properties to be any format ([de31f6a](https://github.com/ackama/eslint-config-ackama/commit/de31f6aefc32e63396aa8a294e72678f211aabf4))
* **@typescript-eslint:** allow variables to be `PascalCase` named ([5abbf1c](https://github.com/ackama/eslint-config-ackama/commit/5abbf1c4decd71f44a1e0d142f72774f4e2479dc))
* **@typescript-eslint:** require enum names to be pascal or upper case ([ad64b1f](https://github.com/ackama/eslint-config-ackama/commit/ad64b1f80425650a17132e40d81c8f92f0f5d56b))
* **@typescript-eslint:** require typeLike names to be PascalCase ([c839b33](https://github.com/ackama/eslint-config-ackama/commit/c839b331f704f6ef558f1efe2ca5847ba6fbaea8))
* **@typescript-eslint:** require var names to be camel or upper case ([52d2a30](https://github.com/ackama/eslint-config-ackama/commit/52d2a30978fe07fd756f6994a18f946d9516f163))
* **@typescript-eslint:** use `naming-convention` for generic type naming ([ef2b574](https://github.com/ackama/eslint-config-ackama/commit/ef2b574fe9d1bf45a653eabdef0c51e09baeed83))
* **@typescript-eslint:** use `naming-convention` for interface naming ([32a4b95](https://github.com/ackama/eslint-config-ackama/commit/32a4b95dee67bf16699a7faa0b004a23ede94438))
* **@typescript-eslint:** use `naming-convention` for member naming ([e7a890e](https://github.com/ackama/eslint-config-ackama/commit/e7a890e9ca4ea107514dcde5f9f23b38127f55e8))


### Features

* **@typescript-eslint:** enable `@typescript-eslint/naming-convention` ([52885ac](https://github.com/ackama/eslint-config-ackama/commit/52885ac13bd60c1844f64a551ce25874df343b7d))

## [1.2.3](https://github.com/ackama/eslint-config-ackama/compare/v1.2.2...v1.2.3) (2020-02-10)


### Bug Fixes

* **javascript:** enable `allowWholeFile` for `disable-enable-pair` ([9f21c19](https://github.com/ackama/eslint-config-ackama/commit/9f21c1923623272e04ef6682d20a902e305f76ec))

## [1.2.2](https://github.com/ackama/eslint-config-ackama/compare/v1.2.1...v1.2.2) (2020-02-07)


### Bug Fixes

* **@typescript-eslint:** use `@typescript-eslint/no-unused-expressions` ([0ddddad](https://github.com/ackama/eslint-config-ackama/commit/0ddddad6d8ccf1ca04c16391aef3c84e42198ab0))

## [1.2.1](https://github.com/ackama/eslint-config-ackama/compare/v1.2.0...v1.2.1) (2020-01-24)


### Bug Fixes

* **javascript:** exclude `ESLintUtils.RuleCreator` from `new-cap` ([5356bf9](https://github.com/ackama/eslint-config-ackama/commit/5356bf95ddcc31b82589e0c7cc9ba0346ec625aa))

# [1.2.0](https://github.com/ackama/eslint-config-ackama/compare/v1.1.0...v1.2.0) (2020-01-24)


### Features

* create `react` config ([d825552](https://github.com/ackama/eslint-config-ackama/commit/d825552b95ecae4dd457f63a74d32cc06e1bfca9))
* **javascript:** add `eslint-plugin-import` ([aace8f0](https://github.com/ackama/eslint-config-ackama/commit/aace8f05fe89420f715a657a13c08af7e72d00f4))
* create `[@typescript-eslint](https://github.com/typescript-eslint)` config ([d8c0e31](https://github.com/ackama/eslint-config-ackama/commit/d8c0e313be398fe22fa5156809ba1748634e4663))
* create `flowtype` config ([313935c](https://github.com/ackama/eslint-config-ackama/commit/313935c89ebdd31981fa7e1fcd50f54487cfcc9c))
* create `jest` config ([1f039f4](https://github.com/ackama/eslint-config-ackama/commit/1f039f40094c1270228c6221d36fbcda864f3d1d))
* **javascript:** enable primary rules ([b23c244](https://github.com/ackama/eslint-config-ackama/commit/b23c244ee3a7a3cdab7d33f21ddc1a765b13e94e))

# [1.1.0](https://github.com/ackama/eslint-config-ackama/compare/v1.0.1...v1.1.0) (2020-01-05)


### Features

* add `eslint-plugin-eslint-comments` plugin ([3799de4](https://github.com/ackama/eslint-config-ackama/commit/3799de464810f167e21fed24723e195b953e8305))

## [1.0.1](https://github.com/ackama/eslint-config-ackama/compare/v1.0.0...v1.0.1) (2020-01-05)


### Bug Fixes

* **package:** add `files` field to `package.json` ([1932b59](https://github.com/ackama/eslint-config-ackama/commit/1932b5947a6b2fa8cf3aeeaafcfc3422f8811d8b))

# 1.0.0 (2020-01-05)


### Bug Fixes

* add `release` script ([c74fe1a](https://github.com/ackama/eslint-config-ackama/commit/c74fe1a217006835dd33dcd7b1e185c555027f26))
* **index:** enable `es2017` env ([68ac87a](https://github.com/ackama/eslint-config-ackama/commit/68ac87a3c078251ae74be764dc717d1ab34c9a47))


### Features

* **index:** add `prettier` configuration ([f7993fb](https://github.com/ackama/eslint-config-ackama/commit/f7993fb7d5ac901be0181aaa26ded98be9c43e5f))
* create initial eslint configuration ([3cbd349](https://github.com/ackama/eslint-config-ackama/commit/3cbd3490f178edd78c7e8adf670234c3615f3fb4))
