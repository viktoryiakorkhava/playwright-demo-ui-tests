import { test, expect } from "@playwright/test";
import { openCheckoutForm } from "./helpers/checkout.js";
import { CheckoutPage } from "../pages/CheckoutPage.js";
import { backpack } from "./data/products.js";

test("Verify Checkout with Valid Information", async ({ page }) => {
  const checkoutPage = new CheckoutPage(page);

  await openCheckoutForm(page);

  await checkoutPage.fillCustomerInformation({
    firstName: "John",
    lastName: "Smith",
    postalCode: "12345",
  });

  await expect(page.locator("#first-name")).toHaveValue("John");
  await expect(page.locator("#last-name")).toHaveValue("Smith");
  await expect(page.locator("#postal-code")).toHaveValue("12345");

  await expect(page.getByRole("button", { name: "Continue" })).toBeVisible();

  await checkoutPage.continueCheckout();

  await expect(page).toHaveURL("/checkout-step-two.html");
  await expect(page.locator('[data-test="title"]')).toBeVisible();
  await expect(page.locator('[data-test="title"]')).toHaveText(
    "Checkout: Overview",
  );
  await expect(
    page.getByText(backpack.name, { exact: true }),
  ).toBeVisible();

  await expect(page.getByRole("button", { name: "Finish" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Cancel" })).toBeVisible();
});
