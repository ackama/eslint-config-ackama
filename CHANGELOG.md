# [4.1.0](https://github.com/ackama/eslint-config-ackama/compare/v4.0.0...v4.1.0) (2025-02-16)


### Features

* make all rules `error` instead of `warn` ([#356](https://github.com/ackama/eslint-config-ackama/issues/356)) ([150887c](https://github.com/ackama/eslint-config-ackama/commit/150887ce8fec98717b372f271c3fec174e0a70cc))

# [4.0.0](https://github.com/ackama/eslint-config-ackama/compare/v3.4.0...v4.0.0) (2024-12-06)


### Bug Fixes

* **javascript:** remove deprecated `no-return-await` rule ([e5a5f35](https://github.com/ackama/eslint-config-ackama/commit/e5a5f359c86db1ad1bc7a1af86014458f783bf9a))
* **javascript:** replace `no-new-object` with `no-object-constructor` ([d2005ce](https://github.com/ackama/eslint-config-ackama/commit/d2005ce8d39eb24c7ab923aac88de1e7b32c1b50))
* omit negation from ignores in flat configuration to avoid breaking `@eslint/config-inspector` ([d6e497f](https://github.com/ackama/eslint-config-ackama/commit/d6e497f18842d04930948c5f873acbaea17fe0f9))
* **typescript:** ensure that eslint recommended overrides are applied ([27c2961](https://github.com/ackama/eslint-config-ackama/commit/27c2961d9750d0e25e087ca55e8a7527901c30af))
* **typescript:** explicitly disable `@typescript-eslint/no-require-imports` ([619df3d](https://github.com/ackama/eslint-config-ackama/commit/619df3d376bc1d8dc6a554fa78f73dc2844c4d53))
* **typescript:** remove `@typescript-eslint/sort-type-constituents` ([e6180b7](https://github.com/ackama/eslint-config-ackama/commit/e6180b7857ebb2e492a7f45a5c9248d37c38fc34))


### Features

* add names to configs ([e408fdb](https://github.com/ackama/eslint-config-ackama/commit/e408fdb1649903432754fc841f666deac53d51be))
* convert configs to flat style ([88ec9f6](https://github.com/ackama/eslint-config-ackama/commit/88ec9f66e1187cfcc0dba2cc3ff3fefffcec84a3))
* **javascript:** drop support for ESLint v7 ([be9b002](https://github.com/ackama/eslint-config-ackama/commit/be9b0027f212777f8e13e15020487f9a667890a9))
* **javascript:** enable built-in `reportUnusedDisableDirectives` check ([b9c8f21](https://github.com/ackama/eslint-config-ackama/commit/b9c8f210507a7110248664d51bc1543a830a70b4))
* **javascript:** switch to `@eslint-community/eslint-plugin-eslint-comments` ([245dcee](https://github.com/ackama/eslint-config-ackama/commit/245dceec15be8fe16f20d79be8763df4f31d0a12))
* **javascript:** switch to `@stylistic/eslint-plugin-js` ([e93ef65](https://github.com/ackama/eslint-config-ackama/commit/e93ef658040812b8977e19a2c46c2540163bdb89))
* **javascript:** switch to `eslint-plugin-n` ([afac2bc](https://github.com/ackama/eslint-config-ackama/commit/afac2bcdebdfb84ba26a342ce268dc71a2ed794d))
* **jest:** drop support for `eslint-plugin-jest` v27 ([e838458](https://github.com/ackama/eslint-config-ackama/commit/e8384587ef8e279f7e05bd5475f02653e1005f1c))
* **jest:** source formatting rules from `eslint-plugin-jest` ([ea36362](https://github.com/ackama/eslint-config-ackama/commit/ea36362b29c1e35e9ef9004db7999db24610ba17))
* make `@eslint/js` a required peer dependency ([873100f](https://github.com/ackama/eslint-config-ackama/commit/873100f85b498d637a903fd7f0f894d6569d574a))
* only officially export flat configuration type configs ([b8cc031](https://github.com/ackama/eslint-config-ackama/commit/b8cc0311aa22396de786c495b2512c526bd65176))
* **react:** remove `jsx-no-bind` rule ([9fa7ef5](https://github.com/ackama/eslint-config-ackama/commit/9fa7ef5f15d4f17cef78a8f9fc988e7474585a45))
* remove `flowtype` config and related plugins ([a781613](https://github.com/ackama/eslint-config-ackama/commit/a7816136ba861809f7a88c9e19ab90e8e8c58802))
* rename `[@typescript-eslint](https://github.com/typescript-eslint)` config to `typescript` ([64eaaec](https://github.com/ackama/eslint-config-ackama/commit/64eaaec8e1af8bf200fc24ef1f49f43ae276572c))
* support `@typescript-eslint/*` v8 ([81d286b](https://github.com/ackama/eslint-config-ackama/commit/81d286bbfe7b7778bfb682bb13270812451680b6))
* switch to exporting arrays to allow multiple configuration objects ([6d956e0](https://github.com/ackama/eslint-config-ackama/commit/6d956e04ed37fe38159e1f13941a7afc0813e5ae))
* **typescript:** drop support for `@typescript-eslint/*` v6 ([87968fc](https://github.com/ackama/eslint-config-ackama/commit/87968fc055b97f2a163e6b622e34316c4fe48c6c))
* **typescript:** switch to `@stylistic/eslint-plugin-ts` ([ec6f9de](https://github.com/ackama/eslint-config-ackama/commit/ec6f9de19fcef32705e023a7570012a670fee2d6))
* upgrade `eslint-config-prettier` to v9 ([0b66abb](https://github.com/ackama/eslint-config-ackama/commit/0b66abbbeace33465e2391d1525e6d9a4574f130))


### BREAKING CHANGES

* you must now use `typescript` instead of `@typescript-eslint`
* you must now ensure `@eslint/js` is installed
* configs are now flat by default, unless `ESLINT_USE_FLAT_CONFIG` is `'false'`
* `flowtype` config is no longer available
* **typescript:** you must now install `@stylistic/eslint-plugin-ts`
* **javascript:** you must now install `@stylistic/eslint-plugin-js`
* **jest:** `eslint-plugin-jest` v27 is no longer supported
* **typescript:** `@typescript-eslint/*` v6 is no longer supported
* **javascript:** ESLint v7 is no longer supported

# [3.4.0](https://github.com/ackama/eslint-config-ackama/compare/v3.3.0...v3.4.0) (2024-12-06)


### Features

* add type declarations for configs ([#347](https://github.com/ackama/eslint-config-ackama/issues/347)) ([7d1577d](https://github.com/ackama/eslint-config-ackama/commit/7d1577dfc1b240ef59656fb34bc1b5913d17ec12)), closes [/github.com/typescript-eslint/typescript-eslint/issues/955#issuecomment-529075082](https://github.com//github.com/typescript-eslint/typescript-eslint/issues/955/issues/issuecomment-529075082)

# [3.3.0](https://github.com/ackama/eslint-config-ackama/compare/v3.2.3...v3.3.0) (2024-11-11)


### Features

* allow `eslint-plugin-react-hooks` v5 ([#343](https://github.com/ackama/eslint-config-ackama/issues/343)) ([39bb9d4](https://github.com/ackama/eslint-config-ackama/commit/39bb9d4ab965c1b4938cc90fdc1afcf81271130c))

## [3.2.3](https://github.com/ackama/eslint-config-ackama/compare/v3.2.2...v3.2.3) (2024-08-06)


### Bug Fixes

* let `prettier` handle `quote-props` ([#334](https://github.com/ackama/eslint-config-ackama/issues/334)) ([9eb3923](https://github.com/ackama/eslint-config-ackama/commit/9eb392354916e40e3f1e5326d2155a74151225d7)), closes [#101](https://github.com/ackama/eslint-config-ackama/issues/101)

## [3.2.2](https://github.com/ackama/eslint-config-ackama/compare/v3.2.1...v3.2.2) (2024-05-10)


### Bug Fixes

* allow v7 of `[@typescript-eslint](https://github.com/typescript-eslint)` and v28 of `eslint-plugin-jest` ([#321](https://github.com/ackama/eslint-config-ackama/issues/321)) ([99f27da](https://github.com/ackama/eslint-config-ackama/commit/99f27da573ef7e2c7c9e8190f818ee1adcbdee72))

## [3.2.1](https://github.com/ackama/eslint-config-ackama/compare/v3.2.0...v3.2.1) (2023-10-22)


### Bug Fixes

* explicitly enable `curly` in configs that include `prettier` ([#293](https://github.com/ackama/eslint-config-ackama/issues/293)) ([496a4fa](https://github.com/ackama/eslint-config-ackama/commit/496a4faa2ccb710d4bd46a06de73859e7a3c1fed))

# [3.2.0](https://github.com/ackama/eslint-config-ackama/compare/v3.1.1...v3.2.0) (2023-08-28)


### Features

* **@typescript-eslint:** upgrade to v6 and enable a few new rules ([#285](https://github.com/ackama/eslint-config-ackama/issues/285)) ([96aab43](https://github.com/ackama/eslint-config-ackama/commit/96aab4365e5e6a19d1d185aa8c97c03890b4f3b6))

## [3.1.1](https://github.com/ackama/eslint-config-ackama/compare/v3.1.0...v3.1.1) (2023-07-14)


### Bug Fixes

* **@typescript-eslint:** replace `no-parameter-properties` with `parameter-properties` ([#284](https://github.com/ackama/eslint-config-ackama/issues/284)) ([7274099](https://github.com/ackama/eslint-config-ackama/commit/7274099b8d49f43a1158137587ac2685925936a1))

# [3.1.0](https://github.com/ackama/eslint-config-ackama/compare/v3.0.1...v3.1.0) (2022-10-18)


### Features

* update `eslint-plugin-jest` to v27 ([#252](https://github.com/ackama/eslint-config-ackama/issues/252)) ([944cbfb](https://github.com/ackama/eslint-config-ackama/commit/944cbfb62421770c41b4023c33464aec0952e1e4))

## [3.0.1](https://github.com/ackama/eslint-config-ackama/compare/v3.0.0...v3.0.1) (2022-03-25)


### Bug Fixes

* **jest:** switch to using `no-conditional-in-test` rule ([#234](https://github.com/ackama/eslint-config-ackama/issues/234)) ([4ddb974](https://github.com/ackama/eslint-config-ackama/commit/4ddb974d405bd6cf833b8e23ca66e74e46c2d4b2))

# [3.0.0](https://github.com/ackama/eslint-config-ackama/compare/v2.3.0...v3.0.0) (2021-11-23)


### Bug Fixes

* **jest:** update renamed rules ([89b3fa9](https://github.com/ackama/eslint-config-ackama/commit/89b3fa9c413c8ec870ccb51fecbc461ba9862913))


### Features

* **@typescript-eslint:** enable `ban-tslint-comment` ([c7a3921](https://github.com/ackama/eslint-config-ackama/commit/c7a39213bb60d40574a99f2a3524c07de083ee2b))
* **@typescript-eslint:** enable `no-base-to-string` ([63fe11a](https://github.com/ackama/eslint-config-ackama/commit/63fe11ae9d37a25035bcc5a124e415df19ea8dc3))
* **@typescript-eslint:** enable `no-confusing-void-expression` ([4fdb5c3](https://github.com/ackama/eslint-config-ackama/commit/4fdb5c3e3d0e062ac98042a63b06e10c857f78e4))
* **@typescript-eslint:** enable `no-dupe-class-members` ([881ac65](https://github.com/ackama/eslint-config-ackama/commit/881ac65d1bbf63e48dcf93c8d80ebceee84f0921))
* **@typescript-eslint:** enable `no-invalid-this` ([84de298](https://github.com/ackama/eslint-config-ackama/commit/84de29822eb900e38f524bd0e9201679f881eeac))
* **@typescript-eslint:** enable `no-meaningless-void-operator` ([eab50a1](https://github.com/ackama/eslint-config-ackama/commit/eab50a1e6cfda895c991296ece1ac47465746c63))
* **@typescript-eslint:** enable `no-non-null-asserted-nullish-coalescing` ([d400c17](https://github.com/ackama/eslint-config-ackama/commit/d400c17970390dcf977b14d06a90f35129ceac48))
* **@typescript-eslint:** enable `no-unnecessary-boolean-literal-compare` ([18ac8f3](https://github.com/ackama/eslint-config-ackama/commit/18ac8f38076f7a270afc9b3c95ffc8bd2f5c4731))
* **@typescript-eslint:** enable `switch-exhaustiveness-check` ([8a275c5](https://github.com/ackama/eslint-config-ackama/commit/8a275c58f7939119835c80868302b9507a83ab26))
* **@typescript-eslint:** use extended version of `dot-notation` ([eadef42](https://github.com/ackama/eslint-config-ackama/commit/eadef426d2ffdacb90082cb90ceed6c92d72546e))
* **javascript:** enable `no-promise-executor-return` ([7cd705f](https://github.com/ackama/eslint-config-ackama/commit/7cd705f03fe21b361e6b39a234f478719b7f7e8a))
* **jest:** enable `prefer-expect-resolves` ([f7873fd](https://github.com/ackama/eslint-config-ackama/commit/f7873fd3fa1492a0b440f2d3140a349a913f1859))
* **jest:** enable `require-hook` ([2cb2534](https://github.com/ackama/eslint-config-ackama/commit/2cb25343f3420a115497a8b97dd6911ac59abbd0))
* update `[@typescript-eslint](https://github.com/typescript-eslint)` to v5 ([8ff77f2](https://github.com/ackama/eslint-config-ackama/commit/8ff77f280c1cbfc5152880844cb550076cb7a3db))
* update `eslint-plugin-flowtype` to v8 ([adca9ec](https://github.com/ackama/eslint-config-ackama/commit/adca9ecf6b02935772c3133a36aa9914106ff980))
* update `eslint-plugin-jest` to v25 ([ae54b14](https://github.com/ackama/eslint-config-ackama/commit/ae54b14a87d8626870e8e00bafab60e2b663f608))
* update to `eslint` v8 ([729e217](https://github.com/ackama/eslint-config-ackama/commit/729e2173a04572fe807b02925ac99af9126d2a0b))


### BREAKING CHANGES

* require `eslint-plugin-flowtype v8
* require `eslint-plugin-jest` v25
* require `@typescript-eslint` v5

# [2.3.0](https://github.com/ackama/eslint-config-ackama/compare/v2.2.1...v2.3.0) (2021-10-28)


### Features

* specify config dependencies as optional peer dependencies ([#188](https://github.com/ackama/eslint-config-ackama/issues/188)) ([a15ab94](https://github.com/ackama/eslint-config-ackama/commit/a15ab940dd361abb09bf4676b9ce32fdb51433d9))

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
