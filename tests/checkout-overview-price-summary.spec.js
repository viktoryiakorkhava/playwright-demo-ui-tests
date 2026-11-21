import { test, expect } from "@playwright/test";
import { openCheckoutOverview } from "./helpers/checkout.js";
import { backpack } from "./data/products.js";

test("Verify Checkout Overview Price Summary", async ({ page }) => {
  await openCheckoutOverview(page);
  await expect(page.locator('[data-test="title"]')).toBeVisible();
  await expect(page.locator('[data-test="title"]')).toHaveText(
    "Checkout: Overview",
  );
  await expect(
    page.getByText(backpack.name, { exact: true }),
  ).toBeVisible();

  await expect(page.locator('[data-test="item-quantity"]')).toHaveText("1");
  await expect(page.locator('[data-test="inventory-item-price"]')).toHaveText(
    backpack.priceText,
  );
  await expect(page.locator('[data-test="subtotal-label"]')).toHaveText(
    `Item total: ${backpack.priceText}`,
  );
  await expect(page.locator('[data-test="tax-label"]')).toHaveText(
    "Tax: $2.40",
  );
  await expect(page.locator('[data-test="total-label"]')).toHaveText(
    "Total: $32.39",
  );

  const subtotalText = await page
    .locator(".summary_subtotal_label")
    .textContent();
  const taxText = await page.locator(".summary_tax_label").textContent();
  const totalText = await page.locator(".summary_total_label").textContent();

  const subtotal = parseFloat(subtotalText.split("$")[1]);
  const tax = parseFloat(taxText.split("$")[1]);
  const total = parseFloat(totalText.split("$")[1]);

  const subtotalCents = Math.round(subtotal * 100);
  const taxCents = Math.round(tax * 100);
  const totalCents = Math.round(total * 100);

  expect(subtotalCents + taxCents).toBe(totalCents);

  await expect(page.getByRole("button", { name: "Finish" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Cancel" })).toBeVisible();
});
