import { test, expect } from "@playwright/test";
import { openCheckoutForm } from "./helpers/checkout.js";
import { CheckoutPage } from "../pages/CheckoutPage.js";

test("Verify Checkout with Empty Customer Information", async ({ page }) => {
  const checkoutPage = new CheckoutPage(page);

  await openCheckoutForm(page);

  await checkoutPage.fillCustomerInformation({
    firstName: "",
    lastName: "",
    postalCode: "",
  });

  await expect(page.locator("#first-name")).toHaveValue("");
  await expect(page.locator("#last-name")).toHaveValue("");
  await expect(page.locator("#postal-code")).toHaveValue("");

  await expect(page.getByRole("button", { name: "Continue" })).toBeVisible();

  await checkoutPage.continueCheckout();

  await expect(page.getByText("Error: First Name is required")).toBeVisible();
  await expect(page).toHaveURL("/checkout-step-one.html");
});
