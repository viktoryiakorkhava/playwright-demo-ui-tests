import { test, expect } from "@playwright/test";
import { InventoryPage } from "../pages/InventoryPage.js";
import { CheckoutPage } from "../pages/CheckoutPage.js";
import { openCheckoutOverview } from "./helpers/checkout.js";
import { backpack } from "./data/products.js";

test("Verify Cancel Button on Checkout Overview Page", async ({ page }) => {
  const inventoryPage = new InventoryPage(page);
  const checkoutPage = new CheckoutPage(page);

  await openCheckoutOverview(page);
  await expect(page.locator('[data-test="title"]')).toBeVisible();
  await expect(page.locator('[data-test="title"]')).toHaveText(
    "Checkout: Overview",
  );
  await expect(
    page.getByText(backpack.name, { exact: true }),
  ).toBeVisible();

  await expect(page.getByRole("button", { name: "Cancel" })).toBeVisible();
  await checkoutPage.cancelCheckout();

  await expect(page).toHaveURL("/inventory.html");
  await expect(page.locator('[data-test="title"]')).toBeVisible();
  await expect(page.locator('[data-test="title"]')).toHaveText("Products");

  const shoppingCartBadge = page.locator(".shopping_cart_badge");
  await expect(shoppingCartBadge).toBeVisible();
  await expect(shoppingCartBadge).toHaveText("1");
  await expect(
    page.locator('[data-test="remove-sauce-labs-backpack"]'),
  ).toBeVisible();

  await inventoryPage.openCart();
  await expect(page).toHaveURL("/cart.html");
  await expect(
    page.getByText(backpack.name, { exact: true }),
  ).toBeVisible();
  await expect(page.locator('[data-test="item-quantity"]')).toHaveText("1");
  await expect(page.locator('[data-test="inventory-item-price"]')).toHaveText(
    backpack.priceText,
  );
});
