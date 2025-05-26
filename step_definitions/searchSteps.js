const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const SearchPage = require('../pages/SearchPage');
const { getSelector } = require('../support/alliasHelper');
/**
 * @type {import('../pages/SearchPage.js')}/// ortak kullanabilmek için intellisense bu şekilde tanıyor
 */

let searchPage;

Given('user is on the homepage', async function () {
  searchPage = new SearchPage(this.page);
  await searchPage.navigate();
});

When('search for {string} product', async function (productName) {
  await searchPage.searchProduct(productName);
});
//ürün arama sonuçları görünür olmalı
Then('{string} product search results should be visible', async function (text) {
  await searchPage.isSearchResultVisible(text);
});

// ürün arama önerileri varmı??
Then('{string} should include {string}', async function (alias,text) {
  const locatorAllias = getSelector(alias);
  await this.page.waitForSelector(locatorAllias, { timeout: 5000 });
const matchCount = await searchPage.countKeywordMatchesOnPage(text, locatorAllias);
expect(matchCount).toBeGreaterThan(0);
});



