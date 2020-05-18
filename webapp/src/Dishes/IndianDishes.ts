const dishes = [
  {
    name: "Tikka masala",
    id: "ZSukCSw5VV4",
  },
  {
    name: "Aloo palak",
    id: "maxIYJlFfxI",
  },
];

export const IndianDishes = dishes.map((dish) => ({
  ...dish,
  category: "Indian",
}));
