export class CheckoutPage {
  constructor(page) {
    this.page = page;
  }

  async fillCustomerInformation(firstName, lastName, postalCode) {
    await this.page.locator("#first-name").fill(firstName);
    await this.page.locator("#last-name").fill(lastName);
    await this.page.locator("#postal-code").fill(postalCode);
  }

  async startCheckout() {
    await this.page.locator("#checkout").click();
  }

  async continueCheckout() {
    await this.page.getByRole("button", { name: "Continue" }).click();
  }
}
