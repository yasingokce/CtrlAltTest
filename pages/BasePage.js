const { expect } = require('@playwright/test');

class BasePage {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    this.page = page;
    
  }

  async navigateToPage(url, specifierText, logoSelector) {
    try {
      await this.page.goto(url, { timeout: 15000 });
      if (logoSelector) {
        await this.page.waitForSelector(logoSelector, { timeout: 10000 });
      }
      if (specifierText) {
        await expect(this.page.getByText(specifierText)).toBeVisible();
      }
    } catch (error) {
      console.error(`Navigation to ${url} failed:`, error);
      throw error;
    }
  }
}

module.exports = BasePage;
