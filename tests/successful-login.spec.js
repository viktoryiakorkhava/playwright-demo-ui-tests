import { test, expect } from "@playwright/test";

test("login with valid credentials", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");
  await page.locator("#user-name").fill("standard_user");
  await page.locator("#password").fill("secret_sauce");
  await expect(page.locator("#user-name")).toHaveValue("standard_user");
  await expect(page.locator("#password")).toHaveValue("secret_sauce");

  await page.getByRole("button", { name: "Login" }).click();

  await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
  await expect(page.locator('[data-test="title"]')).toBeVisible();
  await expect(page.locator('[data-test="title"]')).toHaveText("Products");
});
