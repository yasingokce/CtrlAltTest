const { Given, When, Then } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");
const CartPage = require("../pages/CartPage.js");
const { waitAndGet } = require("../support/utils");

/**
 * @type {import('../pages/CartPage.js')}/// ortak kullanabilmek için intellisense bu şekilde tanıyor
 */

Then("user navigates to the cart page", async function () {
  await this.cartPage.navigate();
});
// ürünü sepete atmadan ismini classa yaz
When("user clicks on the product {string}", async function (alias) {
  await this.page.waitForSelector(this.cartPage.productPageBrandNameLocator, {
    state: "visible",
  });
  const productTitle = await this.page.textContent(
    this.cartPage.productPageBrandNameLocator
  );
  this.cartPage.checkProduct = productTitle;
  const element = await waitAndGet(this.page, alias);
  await element.waitFor({ state: "visible", timeout: 5000 });
  await expect(element).toBeVisible();
  await element.click();
});

Then("check added product", async function () {
  const productPageTitle = await this.page.textContent(
    this.cartPage.cartPageBrandNameLocator
  );
  expect(productPageTitle).toContain(this.cartPage.checkProduct);
});
