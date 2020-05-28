const dishes = [
  {
    name: "Salad",
    id: "IGfIGP5ONV0",
  },
  {
    name: "Chickpea and lentil tacos",
    id: "Qc2ePRQhV5c",
  },
  {
    name: "Avocado toast",
    id: "k4116JZ07S0",
  },
  {
    name: "Black bean and corn salad",
    id: "dZuHkZwryyI",
  },
  {
    name: "Roasted butternut squash soup",
    id: "w6ftFbPCs9I",
  },
  {
    name: "Chickpea salad",
    id: "HGNIpWrA0hw",
  },
  {
    name: "Berry smoothie bowl",
    id: "0PjX9WhsiDs",
  },
  {
    name: "Tofu curry",
    id: "dv5aVQ1H-0U",
  },
  {
    name: "Cauliflower and hazelnut salad",
    id: "E4ZxCUrEX2g",
  },
];

export const VegetarianDishes = dishes.map((dish) => ({
  ...dish,
  category: "Vegetarian",
}));
