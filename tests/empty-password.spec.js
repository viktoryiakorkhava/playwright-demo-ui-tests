import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage.js";

test("login with empty password", async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.open();
  await loginPage.login("standard_user", "");

  const errorMessage = page.locator('[data-test="error"]');
  await expect(errorMessage).toBeVisible();
  await expect(errorMessage).toHaveText("Epic sadface: Password is required");
  await expect(page).toHaveURL("/");
  await expect(page.getByRole("button", { name: "Login" })).toBeVisible();
});
