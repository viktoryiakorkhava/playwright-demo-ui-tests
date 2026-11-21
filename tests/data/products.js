export const backpack = {
  name: "Sauce Labs Backpack",
  priceCents: 2999,

  get priceText() {
    return `$${(this.priceCents / 100).toFixed(2)}`;
  },
};
