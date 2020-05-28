const dishes = [
  {
    name: "Kimbap",
    category: "Korean",
    id: "M1M9PVArnlE",
  },
  {
    name: "Bibimbap",
    id: "diDja86YL_M",
  },
  {
    name: "Japchae",
    id: "H6iSwrAOMG0",
  },
  {
    name: "Korean barbecue",
    id: "3YvFXvDrFyM",
  },
  {
    name: "Tteokbokki",
    id: "n-E0XNnGc-Q",
  },
  {
    name: "Korean army stew",
    id: "BlUxJx3eNp0",
  },
  {
    name: "Korean fried chicken",
    id: "YgirePmHPZU",
  },
];

export const KoreanDishes = dishes.map((dish) => ({
  ...dish,
  category: "Korean",
}));
