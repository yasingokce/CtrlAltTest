module.exports = {
  default: [
    "--require-module",
    "@babel/register",
    "--require",
    "tests/hooks.js",
    "--require",
    "step_definitions/**/*.js",
    "--format",
    "@cucumber/pretty-formatter",
    "--parallel",
    "1",
    "--retry",
    "0",
    "--fail-fast",
  ],
  runner: [
    "--require-module",
    "@babel/register",
    "--require",
    "tests/hooks.js",
    "--require",
    "step_definitions/**/*.js",
    "--format",
    "./tests/support/reporter/AllureReporter.js",  // Allure reporter burada olabilir
    "--parallel",
    "1",
    "--retry",
    "0",
    "--fail-fast",
  ]
};
