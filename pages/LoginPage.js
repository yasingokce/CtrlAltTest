const { expect } = require("@playwright/test");
const { getAliasBySelector } = require("../support/alliasHelper");
const BasePage = require("./BasePage");
class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    this.page = page;
    this.loginPageUrl = "https://www.e-bebek.com/login";
    this.pageLogo = "[alt='Ebebek Logo']";
    this.pageSpecifier = "Üyelik";
    this.loginAccountBtnActive =
      ".btn-link-second-menu.d-block.ng-star-inserted";
    this.loginAccountBtnDisabled =
      ".btn-link-second-menu.d-block.disabled.ng-star-inserted";
    this.eMailTextLocator = "#txtEmail";
    this.welcomeText = "Merhaba";
    this.againWelcomeText = "Tekrar hoş geldiniz, lütfen şifrenizi girin";
    this.passwordTextbox = "#txtPassword";
    this.buttonSubmitPassword = "#btnSubmitPassword";
    this.succesLoginTxt = "Hesabım";
    this.failLoginText = "Kullanıcı adı veya parolanız hatalıdır.";
    this.passRequireTxt = 'p:has-text("Bu alan gereklidir.")';
    this.userNameRequireTxt = 'p:has-text("Hatalı giriş yaptınız")';
  }

  async navigate() {
    try {
      await this.navigateToPage(
        this.loginPageUrl,
        this.pageSpecifier,
        this.pageLogo
      );
    } catch (error) {
      console.error("Error during navigation:", error);
      throw error;
    }
  }

  async login(username, password) {
    const usernameAlias = getAliasBySelector(username);
    const passwordAlias = getAliasBySelector(password);
    // Geçerli kullanıcı adı
    if (usernameAlias === "valid username") {
      await this.fillValidEmailAndClickButton(username);

      if (
        passwordAlias === "valid password" ||
        passwordAlias === "invalid password"
      ) {
        await this.fillPasswordAndSubmit(password);
      } else if (passwordAlias === "empty password") {
        await this.fillEmptyPasswordAndSubmit();
      }
    }
    // Geçersiz kullanıcı adı, sadece e-posta doldurulacak
    else if (
      (usernameAlias === "invalid username" ||
        usernameAlias === "empty username") &&
      password == null
    ) {
      if (usernameAlias === "empty username") {
        await this.fillInvalidEmail(" ");
      } else {
        await this.fillInvalidEmail(username);
      }
    }
  }
  // valid email steps
  async fillValidEmailAndClickButton(email) {
    await this.page.fill(this.eMailTextLocator, email);
    await expect(this.page.locator(this.loginAccountBtnActive)).toBeVisible();
    await this.page.locator(this.loginAccountBtnActive).click();
    await expect(this.page.getByText(this.welcomeText)).toBeVisible();
    await expect(this.page.getByText(this.againWelcomeText)).toBeVisible();
  }

  async clickWithEmailLocator(element) {
    await element.waitFor({ state: "visible", timeout: 5000 });
    await expect(element).toBeVisible();
    await element.click();
  }

  // invalid email steps
  async fillInvalidEmail(email) {
    await this.page.fill(this.eMailTextLocator, email);
    if (!email) {
      await expect(
        this.page.locator(this.loginAccountBtnDisabled)
      ).toBeVisible();
    }
  }
  // valid password steps
  async fillPasswordAndSubmit(password) {
    await this.page.fill(this.passwordTextbox, password);
    await this.page.locator(this.buttonSubmitPassword).click();
  }
  // empty password steps
  async fillEmptyPasswordAndSubmit() {
    await this.page.fill(this.passwordTextbox, "");
    await this.page.locator(this.buttonSubmitPassword).click();
  }
  // login state
  async isLoggedIn(state) {
    if (state === "successful") {
      await this.page.getByRole("link", { name: this.succesLoginTxt });
    } else if (state === "failed") {
      await expect(this.page.getByText(this.failLoginText)).toBeVisible();
    } else if (state === "require password") {
      await expect(this.page.locator(this.passRequireTxt)).toBeVisible();
    } else if (state === "require true Email") {
      await expect(this.page.locator(this.userNameRequireTxt)).toBeVisible();
    } else if (state === "empty username") {
      await expect(this.page.locator(this.passRequireTxt)).toBeVisible();
    }
  }
}

module.exports = LoginPage;
