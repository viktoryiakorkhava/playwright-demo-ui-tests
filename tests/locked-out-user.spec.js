import { test, expect } from "@playwright/test";

test("Login with a Locked-Out User", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");
  await page.locator("#user-name").fill("locked_out_user");
  await page.locator("#password").fill("secret_sauce");
  await expect(page.locator("#user-name")).toHaveValue("locked_out_user");
  await expect(page.locator("#password")).toHaveValue("secret_sauce");

  await page.getByRole("button", { name: "Login" }).click();

  const errorMessage = page.locator('[data-test="error"]');
  await expect(errorMessage).toBeVisible();
  await expect(errorMessage).toHaveText(
    "Epic sadface: Sorry, this user has been locked out.",
  );
  await expect(page).toHaveURL("https://www.saucedemo.com/");
  await expect(page.getByRole("button", { name: "Login" })).toBeVisible();
});
