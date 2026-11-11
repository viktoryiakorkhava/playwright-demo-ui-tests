import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage.js";

test("Successful User Logout", async ({ page }) => {
  const usernameInput = page.locator("#user-name");
  const passwordInput = page.locator("#password");

  const loginPage = new LoginPage(page);

  await loginPage.open();
  await loginPage.login("standard_user", "secret_sauce");

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
