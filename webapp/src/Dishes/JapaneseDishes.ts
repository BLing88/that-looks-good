const dishes = [
  {
    name: "Sushi",
    id: "CA2NgpLIqa0",
  },
  {
    name: "Ramen",
    id: "lbxLlgi_8_w",
  },
  {
    name: "Udon soup",
    id: "1zlLiOT81Jw",
  },
  {
    name: "Takoyaki",
    id: "1OhuSZ2hchk",
  },
  {
    name: "Soba",
    id: "nAV0ojj-m4k",
  },
  {
    name: "Sashimi",
    id: "JnFGgVaFpmE",
  },
  {
    name: "Tamago gohan",
    id: "usiqrCq9ALQ",
  },
  {
    name: "Okonomiyaki",
    id: "WnnYZ6F9qs0",
  },
  {
    name: "Gyudon",
    id: "P5IGqvwEXDQ",
  },
  {
    name: "Chazuke",
    id: "rL-L4fI46ZI",
  },
  {
    name: "Tenpura",
    id: "paMbZ0iNka8",
  },
];

export const JapaneseDishes = dishes.map((dish) => ({
  ...dish,
  category: "Japanese",
}));
