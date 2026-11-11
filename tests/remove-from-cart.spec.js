import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage.js";
import { InventoryPage } from "../pages/InventoryPage.js";

test("remove product from shopping cart", async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.open();
  await loginPage.login("standard_user", "secret_sauce");

  await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
  await expect(page.locator('[data-test="title"]')).toBeVisible();
  await expect(page.locator('[data-test="title"]')).toHaveText("Products");
  await expect(
    page.getByText("Sauce Labs Backpack", { exact: true }),
  ).toBeVisible();

  const inventoryPage = new InventoryPage(page);
  await inventoryPage.addProductToCart("Sauce Labs Backpack");

  await expect(page.locator(".shopping_cart_badge")).toBeVisible();
  await expect(page.locator(".shopping_cart_badge")).toHaveText("1");

  await expect(
    page.locator('[data-test="remove-sauce-labs-backpack"]'),
  ).toBeVisible();

  await inventoryPage.removeProductFromCart("Sauce Labs Backpack");

  await expect(page.locator(".shopping_cart_badge")).toBeHidden();
  await expect(
    page.locator('[data-test="add-to-cart-sauce-labs-backpack"]'),
  ).toBeVisible();
});
