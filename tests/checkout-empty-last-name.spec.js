import { test, expect } from "@playwright/test";

test("Verify Checkout with Empty Last Name", async ({ page }) => {
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

  const shoppingCartBadge = page.locator(".shopping_cart_badge");
  await expect(shoppingCartBadge).toBeVisible();
  await expect(shoppingCartBadge).toHaveText("1");

  await shoppingCartBadge.click();

  await expect(page).toHaveURL("https://www.saucedemo.com/cart.html");
  await expect(page.locator('[data-test="title"]')).toHaveText("Your Cart");

  await expect(page.locator("#checkout")).toBeVisible();
  await page.locator("#checkout").click();

  await expect(page).toHaveURL(
    "https://www.saucedemo.com/checkout-step-one.html",
  );
  await expect(page.locator('[data-test="title"]')).toBeVisible();
  await expect(page.locator('[data-test="title"]')).toHaveText(
    "Checkout: Your Information",
  );
  await expect(page.locator("#first-name")).toBeVisible();
  await page.locator("#first-name").fill("John");
  await expect(page.locator("#first-name")).toHaveValue("John");
  await expect(page.locator("#last-name")).toBeVisible();
  await expect(page.locator("#last-name")).toHaveValue("");
  await expect(page.locator("#postal-code")).toBeVisible();
  await page.locator("#postal-code").fill("12345");
  await expect(page.locator("#postal-code")).toHaveValue("12345");

  await expect(page.getByRole("button", { name: "Continue" })).toBeVisible();
  await page.getByRole("button", { name: "Continue" }).click();
  await expect(page.getByText("Error: Last Name is required")).toBeVisible();
  await expect(page).toHaveURL(
    "https://www.saucedemo.com/checkout-step-one.html",
  );
});
