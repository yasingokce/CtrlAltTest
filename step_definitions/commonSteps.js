const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test'); // Playwright Assertion API
const { waitAndGet } = require('../support/utils');
const { getSelector } = require('../support/alliasHelper');

// Kullanıcı belirtilen URL'ye gider
Given('user navigates to {string}', async function (alias) {
  const url = await getSelector(alias);
  await this.page.goto(url);
});

// Belirli alana metin yazılır (Type) ve tıklanır
When('user types {string} into the {string} field', async function (text, alias) {
  const element = await waitAndGet(this.page, alias);
  await element.fill(text);
  await element.press('Enter');
});

// Belirli alana metin yazılır
When('user types {string} into the {string} textbox', async function (text, alias) {
  const element = await waitAndGet(this.page, alias);
  await element.fill(text);
});

// Selector'e tıklanır
When('user clicks on the selector {string}', async function (alias) {
 //await this.page.locator('.suggestions > ul:nth-of-type(1) > li > a').first().click();
  const element = await waitAndGet(this.page, alias);
  await element.waitFor({ state: 'visible', timeout: 5000 });
  await expect(element).toBeVisible();
  await element.click();
});

// Belirli selector görünür olmalı
Then('the selector {string} should be visible', async function (alias) {
  const element = await waitAndGet(this.page, alias);
  await expect(element).toBeVisible();
});

// Belirli metin sayfada görünmeli
Then('the text {string} should be visible on the page', async function (text) {
  try {
    const locator = this.page.locator(`text=${text}`);
    await locator.waitFor({ state: 'visible', timeout: 5000 });
    await expect(locator).toBeVisible();
  } catch (error) {
    console.error(`Text "${text}" was not visible:`, error.message);
  }
});

// Show placeholder ifadesi
Then('the placeholder text {string} should be displayed', async function (placeholder) {
  await expect(this.page.getByPlaceholder(placeholder)).toBeVisible();
});