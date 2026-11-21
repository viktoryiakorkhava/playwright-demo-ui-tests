import { expect } from "@playwright/test";
import { CartPage } from "../../pages/CartPage.js";
import { InventoryPage } from "../../pages/InventoryPage.js";
import { CheckoutPage } from "../../pages/CheckoutPage.js";
import { standardUser } from "../data/users.js";
import { signIn } from "./auth.js";
import { backpack } from "../data/products.js";

export async function openCartWithProduct(page, productName) {
  const inventoryPage = new InventoryPage(page);

  await signIn(page, standardUser);
  await inventoryPage.addProductToCart(productName);

  await inventoryPage.openCart();
  await expect(page).toHaveURL("/cart.html");
}
export async function openCheckoutForm(page) {
  const cartPage = new CartPage(page);

  await openCartWithProduct(page, backpack.name);
  await cartPage.startCheckout();
  await expect(page).toHaveURL("/checkout-step-one.html");
}
export async function openCheckoutOverview(page) {
  const checkoutPage = new CheckoutPage(page);

  await openCheckoutForm(page);

  await checkoutPage.fillCustomerInformation({
    firstName: "John",
    lastName: "Smith",
    postalCode: "12345",
  });
  await checkoutPage.continueCheckout();
  await expect(page).toHaveURL("/checkout-step-two.html");
}
