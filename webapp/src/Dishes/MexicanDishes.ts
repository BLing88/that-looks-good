const dishes = [
  {
    name: "Tacos",
    id: "ZQf4jzkpz1k",
  },
  {
    name: "Elotes",
    id: "vKJF-6guJ4k",
  },
  {
    name: "Fried shrimp tacos",
    id: "hRRlDgzmDdo",
  },
];

export const MexicanDishes = dishes.map((dish) => ({
  ...dish,
  category: "Mexican",
}));
