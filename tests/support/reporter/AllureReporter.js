const { CucumberJSAllureFormatter } = require('allure-cucumberjs');
const { AllureRuntime } = require('allure-js-commons');

class AllureReporter extends CucumberJSAllureFormatter {
  constructor(options) {
    super({
      ...options,
      runtime: new AllureRuntime({ resultsDir: 'allure-results' }),
    });
  }
}

module.exports = AllureReporter;