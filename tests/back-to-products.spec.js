import { test, expect } from "@playwright/test";
import { InventoryPage } from "../pages/InventoryPage.js";
import { signIn } from "./helpers/auth.js";
import { standardUser } from "./data/users.js";
import { backpack } from "./data/products.js";

test("verify navigation back to products page", async ({ page }) => {
  const inventoryPage = new InventoryPage(page);

  await signIn(page, standardUser);

  await expect(page.locator('[data-test="title"]')).toBeVisible();
  await expect(page.locator('[data-test="title"]')).toHaveText("Products");

  const itemName = page.getByText(backpack.name, { exact: true });
  await expect(itemName).toBeVisible();

  await itemName.click();

  await expect(page).toHaveURL("/inventory-item.html?id=4");

  await expect(page.locator("#back-to-products")).toBeVisible();
  await inventoryPage.backToProducts();

  await expect(page).toHaveURL("/inventory.html");
  await expect(page.locator('[data-test="title"]')).toBeVisible();
  await expect(page.locator('[data-test="title"]')).toHaveText("Products");
  await expect(page.locator('[data-test="inventory-item"]')).toHaveCount(6);
});
