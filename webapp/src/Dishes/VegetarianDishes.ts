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
];

export const VegetarianDishes = dishes.map((dish) => ({
  ...dish,
  category: "Vegetarian",
}));
