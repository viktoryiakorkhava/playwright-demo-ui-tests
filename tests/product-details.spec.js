import { test, expect } from "@playwright/test";

test("verify Sauce Labs Backpack product details", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");
  await page.locator("#user-name").fill("standard_user");
  await page.locator("#password").fill("secret_sauce");
  await expect(page.locator("#user-name")).toHaveValue("standard_user");
  await expect(page.locator("#password")).toHaveValue("secret_sauce");

  await page.getByRole("button", { name: "Login" }).click();

  await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
  await expect(page.locator('[data-test="title"]')).toBeVisible();
  await expect(page.locator('[data-test="title"]')).toHaveText("Products");

  const itemName = page.getByText("Sauce Labs Backpack", { exact: true });
  await expect(itemName).toBeVisible();

  await itemName.click();

  await expect(page).toHaveURL(
    "https://www.saucedemo.com/inventory-item.html?id=4",
  );

  await expect(page.locator('[data-test="inventory-item-desc"]')).toHaveCount(
    1,
  );

  await expect(itemName).toBeVisible();
  await expect(page.locator('[data-test="inventory-item-desc"]')).toBeVisible();
  await expect(
    page.locator('[data-test="inventory-item-price"]'),
  ).toBeVisible();
  await expect(page.locator("#add-to-cart")).toBeVisible();
  await expect(page.locator("#back-to-products")).toBeVisible();
});
