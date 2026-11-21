import { expect } from "@playwright/test";
import { LoginPage } from "../../pages/LoginPage.js";
export async function signIn(page, user) {
  const loginPage = new LoginPage(page);

  await loginPage.open();
  await loginPage.login(user.username, user.password);
  await expect(page).toHaveURL("/inventory.html");
}
