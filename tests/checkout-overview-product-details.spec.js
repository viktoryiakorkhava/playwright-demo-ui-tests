import { test, expect } from "@playwright/test";
import { openCheckoutOverview } from "./helpers/checkout.js";
import { backpack } from "./data/products.js";

test("Verify Product Details on Checkout Overview Page", async ({ page }) => {
  await openCheckoutOverview(page);

  await expect(page.locator('[data-test="title"]')).toBeVisible();
  await expect(page.locator('[data-test="title"]')).toHaveText(
    "Checkout: Overview",
  );
  await expect(
    page.getByText(backpack.name, { exact: true }),
  ).toBeVisible();

  await expect(page.locator('[data-test="inventory-item-desc"]')).toHaveText(
    "carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.",
  );
  await expect(page.locator('[data-test="item-quantity"]')).toHaveText("1");
  await expect(page.locator('[data-test="inventory-item-price"]')).toHaveText(
    backpack.priceText,
  );

  await expect(page.getByRole("button", { name: "Finish" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Cancel" })).toBeVisible();
});
