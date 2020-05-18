const dishes = [
  {
    name: "Bolognese",
    id: "Cs5xVwB50Ps",
  },
  {
    name: "Spaghetti with meatballs",
    id: "AUAuEgUxg5Q",
  },
  {
    name: "Bruschetta",
    id: "rPkgYDh2bmo",
  },
  {
    name: "Caprese salad",
    id: "rq0GMrnLj8c",
  },
  {
    name: "Aglio e olio",
    id: "jL3X9oeQ3Ps",
  },
  {
    name: "Spaghetti with scallops in tomato sauce",
    id: "eBArcwOXLOk",
  },
  {
    name: "Strozzapreti in olive oil with bacon",
    id: "h0tTG5eosAQ",
  },
  {
    name: "Penne with mushrooms and herbs",
    id: "vUE2mIFb8lE",
  },
  {
    name: "Fettucine with pesto",
    id: "9KJfKYqZxcc",
  },
  {
    name: "Ravioli",
    id: "Qjxfm-OuoMA",
  },
];

export const ItalianDishes = dishes.map((dish) => ({
  ...dish,
  category: "Italian",
}));
