import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage.js";
import { InventoryPage } from "../pages/InventoryPage.js";

test("verify Sauce Labs Backpack product details", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);

  await loginPage.open();
  await loginPage.login("standard_user", "secret_sauce");

  await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
  await expect(page.locator('[data-test="title"]')).toBeVisible();
  await expect(page.locator('[data-test="title"]')).toHaveText("Products");

  const itemName = page.getByText("Sauce Labs Backpack", { exact: true });
  await expect(itemName).toBeVisible();

  await inventoryPage.openProductDetails("Sauce Labs Backpack");

  await expect(page).toHaveURL(
    "https://www.saucedemo.com/inventory-item.html?id=4",
  );

  await expect(page.locator('[data-test="inventory-item-desc"]')).toHaveCount(
    1,
  );

  await expect(itemName).toBeVisible();
  await expect(page.locator('[data-test="inventory-item-desc"]')).toBeVisible();
  await expect(
    page.locator('[data-test="inventory-item-price"]'),
  ).toBeVisible();
  await expect(page.locator("#add-to-cart")).toBeVisible();
  await expect(page.locator("#back-to-products")).toBeVisible();
});
