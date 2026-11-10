import { test, expect } from "@playwright/test";

test("login with empty username", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");
  await expect(page.locator("#user-name")).toHaveValue("");
  await page.locator("#password").fill("secret_sauce");
  await expect(page.locator("#password")).toHaveValue("secret_sauce");

  await page.getByRole("button", { name: "Login" }).click();

  const errorMessage = page.locator('[data-test="error"]');
  await expect(errorMessage).toBeVisible();
  await expect(errorMessage).toHaveText("Epic sadface: Username is required");
  await expect(page).toHaveURL("https://www.saucedemo.com/");
  await expect(page.getByRole("button", { name: "Login" })).toBeVisible();
});
