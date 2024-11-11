// this is an empty file used by the tests for running ESLint programmatic,
// as we have to use a real file for the TypeScript service to work, and
// for some reason lintText likes to read in the file contents even though
// it shouldn't be, _and_ it ignores eslint-disable comments in the file
//
// note also for some reason the behaviour can change depending on if the
// 'CI' environment variable is set, meaning it's possible to get the tests
// passing locally without this only for them to then fail in CI
//
// todo: we can probably clean this up once we've dropped support for v8
