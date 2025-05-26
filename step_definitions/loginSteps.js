const { Given, When, Then } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");
const LoginPage = require("../pages/LoginPage.js");
const { getSelector } = require('../support/alliasHelper');
const { waitAndGet } = require('../support/utils');
/**
 * @type {import('../pages/LoginPage.js')}/// ortak kullanabilmek için intellisense bu şekilde tanıyor
 */
let loginPage;

// Kullanıcı login sayfasına gider
Given("user is on the login page", async function () {
  loginPage = new LoginPage(this.page);
  await loginPage.navigate();
});

When('user clicks on the locator {string}', async function (alias) {
  const element = await waitAndGet(this.page, alias);
  await loginPage.clickWithEmailLocator(element);
});

// Kullanıcı geçerli kullanıcı adı ve şifre ile giriş yapar
When("user logs in with {string} and {string}", async function (username,password) {
  const userNameAllias = getSelector(username);
  const passwordAllias = getSelector(password);
  await loginPage.login(userNameAllias, passwordAllias);
});

// Kullanıcı geçersiz kullanıcı adı ile giriş yapar
When("user logs in with {string}", async function (username) {
  const userNameAllias = getSelector(username);
  await loginPage.login(userNameAllias, null);
});

// user login
Then('user login {string}', async function (state) {
  await loginPage.isLoggedIn(state);
});
