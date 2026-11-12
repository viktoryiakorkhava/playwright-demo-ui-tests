import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage.js";

test("login page verification", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.open();

  await expect(page).toHaveTitle("Swag Labs");
  await expect(page.locator("#user-name")).toBeVisible();
  await expect(page.locator("#password")).toBeVisible();
  await expect(page.getByRole("button", { name: "Login" })).toBeVisible();
});
