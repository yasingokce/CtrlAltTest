const { Before, After, Status } = require("@cucumber/cucumber");
const { chromium, firefox, webkit } = require("playwright");
const LoginPage = require("../pages/LoginPage.js");
const SearchPage = require("../pages/SearchPage.js");
const CartPage = require("../pages/CartPage.js");
const { getSelector } = require("../support/alliasHelper");
const { setDefaultTimeout } = require("@cucumber/cucumber");
setDefaultTimeout(20000);

let browserType = process.env.BROWSER || "chromium"; // default yoksa default chrome

Before(async function () {
  const browsers = { chromium, firefox, webkit };
  this.browser = await browsers[browserType].launch({ headless: true });
  this.context = await this.browser.newContext();
  this.page = await this.context.newPage();
});

Before({ tags: "@cartBefore" }, async function () {
  // cartı tutmak için
  this.cartPage = new CartPage(this.page);
});

Before({ tags: "@logOutBefore" }, async function () {
  const loginPage = new LoginPage(this.page);
  await loginPage.navigate();
  await loginPage.clickWithEmailLocator(
    this.page.locator("#btnLoginWithEmail")
  );
  const userNameAllias = getSelector("valid username");
  const passwordAllias = getSelector("valid password");
  await loginPage.login(userNameAllias, passwordAllias);
});
After(async function (scenario) {
  if (scenario.result.status === Status.PASSED) {
    this.attach("Scenario passed", "text/plain");
  }
  if (scenario.result.status === Status.FAILED) {
    const screenshot = await this.page.screenshot();
    this.attach(screenshot, "image/png");
  }
  await this.page.close();
  await this.context.close();
  await this.browser.close();
});
