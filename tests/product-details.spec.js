import { test, expect } from "@playwright/test";
import { InventoryPage } from "../pages/InventoryPage.js";
import { signIn } from "./helpers/auth.js";
import { standardUser } from "./data/users.js";
import { backpack } from "./data/products.js";

test("verify Sauce Labs Backpack product details", async ({ page }) => {
  const inventoryPage = new InventoryPage(page);

  await signIn(page, standardUser);

  await expect(page.locator('[data-test="title"]')).toBeVisible();
  await expect(page.locator('[data-test="title"]')).toHaveText("Products");

  const itemName = page.getByText(backpack.name, { exact: true });
  await expect(itemName).toBeVisible();

  await inventoryPage.openProductDetails(backpack.name);

  await expect(page).toHaveURL("/inventory-item.html?id=4");

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
