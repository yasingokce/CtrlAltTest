const BasePage = require("./BasePage");

class LogoutPage extends BasePage {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    super(page);
    this.page = page;
  }
}

module.exports = LogoutPage;
