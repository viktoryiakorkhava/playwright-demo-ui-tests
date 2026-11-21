import { test, expect } from "@playwright/test";
import { CartPage } from "../pages/CartPage.js";
import { InventoryPage } from "../pages/InventoryPage.js";
import { signIn } from "./helpers/auth.js";
import { standardUser } from "./data/users.js";
import { backpack } from "./data/products.js";

test("Verify Continue Shopping Button", async ({ page }) => {
  const cartPage = new CartPage(page);
  const inventoryPage = new InventoryPage(page);

  await signIn(page, standardUser);

  await expect(page.locator('[data-test="title"]')).toBeVisible();
  await expect(page.locator('[data-test="title"]')).toHaveText("Products");
  await expect(
    page.getByText(backpack.name, { exact: true }),
  ).toBeVisible();

  await inventoryPage.addProductToCart(backpack.name);

  const shoppingCartBadge = page.locator(".shopping_cart_badge");
  await expect(shoppingCartBadge).toBeVisible();
  await expect(shoppingCartBadge).toHaveText("1");

  await inventoryPage.openCart();

  await expect(page).toHaveURL("/cart.html");
  await expect(page.locator('[data-test="title"]')).toHaveText("Your Cart");

  await expect(page.locator("#continue-shopping")).toBeVisible();
  await cartPage.continueShopping();

  await expect(page).toHaveURL("/inventory.html");
  await expect(page.locator('[data-test="title"]')).toBeVisible();
  await expect(page.locator('[data-test="title"]')).toHaveText("Products");
  await expect(page.locator('[data-test="inventory-item"]')).toHaveCount(6);
  await expect(shoppingCartBadge).toHaveText("1");
});
