const { When, Then } = require('@cucumber/cucumber');
const LogoutPage = require('../pages/LogoutPage.js');
const { expect } = require('@playwright/test');
const { getSelector } = require('../support/alliasHelper');

/**
 * @type {import('../pages/LogoutPage.js')}/// giwen when then de ortak kullanabilmek için intellisense bu şekilde tanıyor
 */
let logoutPage;

Then('the {string} should be displayed', async function (alias) {
  const url= getSelector(alias);
 await expect(this.page).toHaveURL(url);

});
