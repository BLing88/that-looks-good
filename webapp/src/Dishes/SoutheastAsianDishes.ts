const dishes = [
  {
    name: "Pad thai",
    id: "zCPfqE7htNE",
  },
  {
    name: "Thai red curry",
    id: "XoByiBymX20",
  },
  {
    name: "Thai yellow curry",
    id: "ojposW2CPno",
  },
  {
    name: "Curry noodles",
    id: "5aCcwPXe5l0",
  },
  {
    name: "Banh xeo",
    id: "_KW74Yat8HY",
  },
  {
    name: "Shrimp and curry soup",
    id: "tWkA48kabZE",
  },
  {
    name: "Khao soi",
    id: "_6bfVnELZXE",
  },
  {
    name: "Spring roll",
    id: "aKaEpUH4kB8",
  },
  {
    name: "Pho",
    id: "EK--nAm-CYM",
  },
  {
    name: "Konro",
    id: "hQtvFTB8qFk",
  },
  {
    name: "Vermicelli bowl (Bun cha)",
    id: "dO3kPzQak3c",
  },
  {
    name: "Bun rieu",
    id: "iXYD_ED94Gk",
  },
];

export const SoutheastAsianDishes = dishes.map((dish) => ({
  ...dish,
  category: "Southeast asian",
}));
