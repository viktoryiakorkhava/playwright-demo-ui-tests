import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage.js";
import { InventoryPage } from "../pages/InventoryPage.js";

test("Remove a Product from the Shopping Cart Page", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);

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
  await expect(
    page.getByText("Sauce Labs Backpack", { exact: true }),
  ).toBeVisible();
  await expect(page.getByRole("button", { name: "Remove" })).toBeVisible();

  await inventoryPage.removeProductFromCart("Sauce Labs Backpack");

  await expect(
    page.getByText("Sauce Labs Backpack", { exact: true }),
  ).toHaveCount(0);
  await expect(page.locator('[data-test="inventory-item"]')).toHaveCount(0);
  await expect(shoppingCartBadge).toBeHidden();
});
