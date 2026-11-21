import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage.js";

test("Login with a Locked-Out User", async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.open();
  await loginPage.login("locked_out_user", "secret_sauce");

  const errorMessage = page.locator('[data-test="error"]');
  await expect(errorMessage).toBeVisible();
  await expect(errorMessage).toHaveText(
    "Epic sadface: Sorry, this user has been locked out.",
  );
  await expect(page).toHaveURL("/");
  await expect(page.getByRole("button", { name: "Login" })).toBeVisible();
});
