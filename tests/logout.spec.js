import { test, expect } from "@playwright/test";

test("Successful User Logout", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");

  const usernameInput = page.locator("#user-name");
  const passwordInput = page.locator("#password");

  await usernameInput.fill("standard_user");
  await passwordInput.fill("secret_sauce");
  await expect(usernameInput).toHaveValue("standard_user");
  await expect(passwordInput).toHaveValue("secret_sauce");

  await page.getByRole("button", { name: "Login" }).click();

  await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
  await expect(page.locator('[data-test="title"]')).toBeVisible();
  await expect(page.locator('[data-test="title"]')).toHaveText("Products");

  await page.locator("#react-burger-menu-btn").click();
  await expect(page.locator("#logout_sidebar_link")).toBeVisible();
  await page.locator("#logout_sidebar_link").click();

  await expect(page).toHaveURL("https://www.saucedemo.com/");
  await expect(usernameInput).toBeVisible();
  await expect(passwordInput).toBeVisible();
  await expect(page.getByRole("button", { name: "Login" })).toBeVisible();
});
