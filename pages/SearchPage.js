const { expect } = require("@playwright/test");
const BasePage = require("./BasePage");
class SearchPage extends BasePage {
  constructor(page) {
    super(page);
    this.page = page;
    this.homePageUrl = "https://www.e-bebek.com/";
    this.pageSpecifier = "Keşfet";
    this.pageLogo = "[alt='ebebek logo']";
    this.searchBox = page.locator("#txtSearchBox");
    this.productListCountLocator = "eb-product-list-item";
    this.productListCount = ".product-list-count";
    this.searchText = "";
    this.itemsBoxLocator = "h2.product-item__brand";
  }

  async navigate() {
    try {
      await this.navigateToPage(
        this.homePageUrl,
        this.pageSpecifier,
        this.pageLogo
      );
    } catch (error) {
      console.error("Error during navigation:", error);
      throw error;
    }
  }

  async searchProduct(productName) {
    await this.searchBox.fill(productName);
    await this.searchBox.press("Enter");
  }

  async getProductCount() {
    return await this.page.locator(this.productListCountLocator).count();
  }

  async isSearchResultVisible(validOrNot) {
    const productCountFromText = await this.extractProductCountFromText();
    const listedProductCount = await this.getProductCount();
    const keywordMatchCount = await this.countKeywordMatchesOnPage(
      this.searchText,
      this.itemsBoxLocator
    );
    if ("valid" === validOrNot) {
      expect(listedProductCount).toBeGreaterThan(0);
      expect(productCountFromText).toBeGreaterThanOrEqual(listedProductCount);
      expect(listedProductCount).toBeGreaterThanOrEqual(keywordMatchCount);
    } else if ("invalid" === validOrNot) {
      expect(listedProductCount).toBeGreaterThan(0);
      expect(keywordMatchCount).toBe(0);
    }
  }

  async extractProductCountFromText() {
    const text = await this.page.textContent(this.productListCount);
    const match = text.match(/\d+/);
    return match ? parseInt(match[0], 10) : 0;
  }

  async countKeywordMatchesOnPage(keyword, locator) {
    const allProducts = await this.page.locator(locator).allTextContents();

    const matches = allProducts.filter((text) =>
      text.toLowerCase().includes(keyword.toLowerCase())
    );

    return matches.length;
  }
}

module.exports = SearchPage;
