export class InventoryPage {
  constructor(page) {
    this.page = page;
  }

  async openCart() {
    await this.page.locator(".shopping_cart_link").click();
  }

  async openProductDetails(productName) {
    await this.page.getByText(productName, { exact: true }).click();
  }
  async addProductToCart(productName) {
    const productLocator = productName.toLowerCase().replaceAll(" ", "-");
    await this.page
      .locator(`[data-test="add-to-cart-${productLocator}"]`)
      .click();
  }

  async removeProductFromCart(productName) {
    const productLocator = productName.toLowerCase().replaceAll(" ", "-");
    await this.page.locator(`[data-test="remove-${productLocator}"]`).click();
  }
  async backToProducts() {
    await this.page.locator("#back-to-products").click();
  }
}
