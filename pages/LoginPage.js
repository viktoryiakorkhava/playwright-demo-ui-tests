export class LoginPage {
  constructor(page) {
    this.page = page;
  }
  async open() {
    await this.page.goto("https://www.saucedemo.com/");
  }

  async login(username, password) {
    await this.page.locator("#user-name").fill(username);
    await this.page.locator("#password").fill(password);
    await this.page.getByRole("button", { name: "Login" }).click();
  }
}
