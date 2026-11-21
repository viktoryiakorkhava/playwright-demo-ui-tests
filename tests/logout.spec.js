import { test, expect } from "@playwright/test";
import { signIn } from "./helpers/auth.js";
import { standardUser } from "./data/users.js";

test("Successful User Logout", async ({ page }) => {
  const usernameInput = page.locator("#user-name");
  const passwordInput = page.locator("#password");

  await signIn(page, standardUser);

  await expect(page.locator('[data-test="title"]')).toBeVisible();
  await expect(page.locator('[data-test="title"]')).toHaveText("Products");

  await page.locator("#react-burger-menu-btn").click();
  await expect(page.locator("#logout_sidebar_link")).toBeVisible();
  await page.locator("#logout_sidebar_link").click();

  await expect(page).toHaveURL("/");
  await expect(usernameInput).toBeVisible();
  await expect(passwordInput).toBeVisible();
  await expect(page.getByRole("button", { name: "Login" })).toBeVisible();
});
