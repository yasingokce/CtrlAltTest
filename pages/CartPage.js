const BasePage = require("./BasePage");
class CartPage extends BasePage {
  constructor(page) {
    super(page);
    this.page = page;
    this.cartPageUrl = "https://www.e-bebek.com/cart";
    this.pageSpecifier = "Sepetim";
    this.pageLogo = "[alt='ebebek logo']";
    this.checkProduct="";
    this.productPageBrandNameLocator ="span.description.plist-desc";
    this.cartPageBrandNameLocator ='a.cx-link > h2';
  }

  async navigate() {
    try {
      await this.navigateToPage(
        this.cartPageUrl,
        this.pageSpecifier,
        this.pageLogo
      );
    } catch (error) {
      console.error("Error during navigation:", error);
      throw error;
    }
  }
}

module.exports = CartPage;
