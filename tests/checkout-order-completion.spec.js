import { test, expect } from "@playwright/test";
import { CheckoutPage } from "../pages/CheckoutPage.js";
import { openCheckoutOverview } from "./helpers/checkout.js";
import { backpack } from "./data/products.js";

test("Verify Successful Order Completion", async ({ page }) => {
  const checkoutPage = new CheckoutPage(page);

  await openCheckoutOverview(page);

  await expect(page.locator('[data-test="title"]')).toBeVisible();
  await expect(page.locator('[data-test="title"]')).toHaveText(
    "Checkout: Overview",
  );
  await expect(
    page.getByText(backpack.name, { exact: true }),
  ).toBeVisible();

  await expect(page.getByRole("button", { name: "Finish" })).toBeVisible();
  await checkoutPage.finishCheckout();

  await expect(page).toHaveURL("/checkout-complete.html");
  await expect(page.locator('[data-test="title"]')).toHaveText(
    "Checkout: Complete!",
  );
  await expect(page.locator('[data-test="complete-header"]')).toHaveText(
    "Thank you for your order!",
  );
  await expect(page.locator('[data-test="complete-text"]')).toHaveText(
    "Your order has been dispatched, and will arrive just as fast as the pony can get there!",
  );
  await expect(page.getByRole("button", { name: "Back Home" })).toBeVisible();

  const shoppingCartBadge = page.locator(".shopping_cart_badge");
  await expect(shoppingCartBadge).not.toBeVisible();
});
