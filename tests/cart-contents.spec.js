import { test, expect } from "@playwright/test";
import { InventoryPage } from "../pages/InventoryPage.js";
import { signIn } from "./helpers/auth.js";
import { standardUser } from "./data/users.js";
import { backpack } from "./data/products.js";

test("Verify Shopping Cart Contents", async ({ page }) => {
  await signIn(page, standardUser);

  await expect(page.locator('[data-test="title"]')).toBeVisible();
  await expect(page.locator('[data-test="title"]')).toHaveText("Products");
  await expect(page.getByText(backpack.name, { exact: true })).toBeVisible();

  const inventoryPage = new InventoryPage(page);
  await inventoryPage.addProductToCart(backpack.name);

  const shoppingCartBadge = page.locator(".shopping_cart_badge");
  await expect(shoppingCartBadge).toBeVisible();
  await expect(shoppingCartBadge).toHaveText("1");

  await inventoryPage.openCart();

  await expect(page).toHaveURL("/cart.html");
  await expect(page.locator('[data-test="title"]')).toHaveText("Your Cart");
  await expect(page.getByText(backpack.name, { exact: true })).toBeVisible();
  await expect(page.locator('[data-test="item-quantity"]')).toHaveText("1");
  await expect(page.locator('[data-test="inventory-item-price"]')).toHaveText(
    backpack.priceText,
  );
  await expect(page.getByRole("button", { name: "Remove" })).toBeVisible();
});
