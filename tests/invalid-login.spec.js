import { test, expect } from "@playwright/test";
test("invalid login verification", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");
  await page.locator("#user-name").fill("invalid_user");
  await page.locator("#password").fill("wrong_password");
  await expect(page.locator("#user-name")).toHaveValue("invalid_user");
  await expect(page.locator("#password")).toHaveValue("wrong_password");

  await page.getByRole("button", { name: "Login" }).click();

  await expect(page.locator('[data-test="error"]')).toBeVisible();
  await expect(page.locator('[data-test="error"]')).toHaveText(
    "Epic sadface: Username and password do not match any user in this service",
  );
  await expect(page).toHaveURL("https://www.saucedemo.com/");
  await expect(page.getByRole("button", { name: "Login" })).toBeVisible();
});
