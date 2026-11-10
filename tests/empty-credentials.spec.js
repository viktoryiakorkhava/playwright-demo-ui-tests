import { test, expect } from "@playwright/test";
test("invalid login verification", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");
  await expect(page.locator("#user-name")).toHaveValue("");
  await expect(page.locator("#password")).toHaveValue("");

  await page.getByRole("button", { name: "Login" }).click();

  const errorMessage = page.locator('[data-test="error"]');
  await expect(errorMessage).toBeVisible();
  await expect(errorMessage).toHaveText("Epic sadface: Username is required");
  await expect(page).toHaveURL("https://www.saucedemo.com/");
  await expect(page.getByRole("button", { name: "Login" })).toBeVisible();
});
