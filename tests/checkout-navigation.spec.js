import { test, expect } from "@playwright/test";
import { CartPage } from "../pages/CartPage.js";
import { openCartWithProduct } from "./helpers/checkout.js";
import { backpack } from "./data/products.js";

test("Verify Checkout Button Navigation", async ({ page }) => {
  const cartPage = new CartPage(page);

  await openCartWithProduct(page, backpack.name);
  await expect(page.locator('[data-test="title"]')).toHaveText("Your Cart");

  await expect(page.locator("#checkout")).toBeVisible();
  await cartPage.startCheckout();

  await expect(page).toHaveURL("/checkout-step-one.html");
  await expect(page.locator('[data-test="title"]')).toBeVisible();
  await expect(page.locator('[data-test="title"]')).toHaveText(
    "Checkout: Your Information",
  );
  await expect(page.locator("#first-name")).toBeVisible();
  await expect(page.locator("#last-name")).toBeVisible();
  await expect(page.locator("#postal-code")).toBeVisible();

  await expect(page.getByRole("button", { name: "Continue" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Cancel" })).toBeVisible();
});
