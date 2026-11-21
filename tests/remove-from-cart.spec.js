import { test, expect } from "@playwright/test";
import { InventoryPage } from "../pages/InventoryPage.js";
import { signIn } from "./helpers/auth.js";
import { standardUser } from "./data/users.js";
import { backpack } from "./data/products.js";

test("remove product from shopping cart", async ({ page }) => {
  await signIn(page, standardUser);

  await expect(page.locator('[data-test="title"]')).toBeVisible();
  await expect(page.locator('[data-test="title"]')).toHaveText("Products");
  await expect(
    page.getByText(backpack.name, { exact: true }),
  ).toBeVisible();

  const inventoryPage = new InventoryPage(page);
  await inventoryPage.addProductToCart(backpack.name);

  await expect(page.locator(".shopping_cart_badge")).toBeVisible();
  await expect(page.locator(".shopping_cart_badge")).toHaveText("1");

  await expect(
    page.locator('[data-test="remove-sauce-labs-backpack"]'),
  ).toBeVisible();

  await inventoryPage.removeProductFromCart(backpack.name);

  await expect(page.locator(".shopping_cart_badge")).toBeHidden();
  await expect(
    page.locator('[data-test="add-to-cart-sauce-labs-backpack"]'),
  ).toBeVisible();
});
