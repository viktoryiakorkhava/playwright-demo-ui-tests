import { test, expect } from "@playwright/test";

test("remove product to shopping cart", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");
  await page.locator("#user-name").fill("standard_user");
  await page.locator("#password").fill("secret_sauce");
  await expect(page.locator("#user-name")).toHaveValue("standard_user");
  await expect(page.locator("#password")).toHaveValue("secret_sauce");

  await page.getByRole("button", { name: "Login" }).click();

  await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
  await expect(page.locator('[data-test="title"]')).toBeVisible();
  await expect(page.locator('[data-test="title"]')).toHaveText("Products");
  await expect(
    page.getByText("Sauce Labs Backpack", { exact: true }),
  ).toBeVisible();

  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();

  await expect(page.locator(".shopping_cart_badge")).toBeVisible();
  await expect(page.locator(".shopping_cart_badge")).toHaveText("1");

  await expect(
    page.locator('[data-test="remove-sauce-labs-backpack"]'),
  ).toBeVisible();

  await page.locator('[data-test="remove-sauce-labs-backpack"]').click();

  await expect(page.locator(".shopping_cart_badge")).toBeHidden();
  await expect(
    page.locator('[data-test="add-to-cart-sauce-labs-backpack"]'),
  ).toBeVisible();
});
