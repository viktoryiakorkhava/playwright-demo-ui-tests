import { test, expect } from "@playwright/test";
import { signIn } from "./helpers/auth.js";
import { standardUser } from "./data/users.js";

test("inventory page displays all products", async ({ page }) => {
  await signIn(page, standardUser);

  await expect(page.locator('[data-test="title"]')).toBeVisible();
  await expect(page.locator('[data-test="title"]')).toHaveText("Products");

  const items = page.locator('[data-test="inventory-item"]');
  await expect(items).toHaveCount(6);

  const itemNames = page.locator('[data-test="inventory-item-name"]');
  await expect(itemNames).toHaveCount(6);
  for (let i = 0; i < (await itemNames.count()); i++) {
    await expect(itemNames.nth(i)).toBeVisible();
  }

  const itemPrices = page.locator('[data-test="inventory-item-price"]');
  await expect(itemPrices).toHaveCount(6);
  for (let i = 0; i < (await itemPrices.count()); i++) {
    await expect(itemPrices.nth(i)).toBeVisible();
  }

  await expect(page.getByRole("button", { name: "Add to cart" })).toHaveCount(
    6,
  );
});
