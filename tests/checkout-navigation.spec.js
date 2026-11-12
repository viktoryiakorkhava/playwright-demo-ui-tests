import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage.js";
import { InventoryPage } from "../pages/InventoryPage.js";
import { CheckoutPage } from "../pages/CheckoutPage.js";

test("Verify Checkout Button Navigation", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const checkoutPage = new CheckoutPage(page);

  await loginPage.open();
  await loginPage.login("standard_user", "secret_sauce");

  await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
  await expect(page.locator('[data-test="title"]')).toBeVisible();
  await expect(page.locator('[data-test="title"]')).toHaveText("Products");
  await expect(
    page.getByText("Sauce Labs Backpack", { exact: true }),
  ).toBeVisible();

  await inventoryPage.addProductToCart("Sauce Labs Backpack");

  const shoppingCartBadge = page.locator(".shopping_cart_badge");
  await expect(shoppingCartBadge).toBeVisible();
  await expect(shoppingCartBadge).toHaveText("1");

  await inventoryPage.openCart();

  await expect(page).toHaveURL("https://www.saucedemo.com/cart.html");
  await expect(page.locator('[data-test="title"]')).toHaveText("Your Cart");

  await expect(page.locator("#checkout")).toBeVisible();
  await checkoutPage.startCheckout();

  await expect(page).toHaveURL(
    "https://www.saucedemo.com/checkout-step-one.html",
  );
  await expect(page.locator('[data-test="title"]')).toBeVisible();
  await expect(page.locator('[data-test="title"]')).toHaveText(
    "Checkout: Your Information",
  );
  await expect(page.locator("#first-name")).toBeVisible();
  await expect(page.locator("#last-name")).toBeVisible();
  await expect(page.locator("#postal-code")).toBeVisible();

  await expect(page.getByRole("button", { name: "Continue" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Cancel" })).toBeVisible();
});
