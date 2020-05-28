const dishes = [
  {
    name: "Tikka masala",
    id: "ZSukCSw5VV4",
  },
  {
    name: "Aloo palak",
    id: "maxIYJlFfxI",
  },
  {
    name: "Dal gosht",
    id: "5X0fUXvhxTI",
  },
  {
    name: "Samosas",
    id: "hg-JXHPmdGY",
  },
  {
    name: "Biryani",
    id: "TmFeLHDXSIg",
  },
  {
    name: "Chicken korma",
    id: "G7NCicWNAfo",
  },
];

export const IndianDishes = dishes.map((dish) => ({
  ...dish,
  category: "Indian",
}));
