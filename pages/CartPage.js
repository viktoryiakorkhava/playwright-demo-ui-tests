export class CartPage {
  constructor(page) {
    this.page = page;
  }
  async continueShopping() {
    await this.page.locator("#continue-shopping").click();
  }

  async startCheckout() {
    await this.page.locator("#checkout").click();
  }

  async removeProductFromCart(productName) {
    const productLocator = productName.toLowerCase().replaceAll(" ", "-");
    await this.page.locator(`[data-test="remove-${productLocator}"]`).click();
  }
}
