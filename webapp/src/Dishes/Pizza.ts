const dishes = [
  {
    name: "Pepperoni pizza",
    id: "SU1LFoeEUkk",
  },
  {
    name: "Cheese and basil pizza",
    id: "x00CzBt4Dfk",
  },
  {
    name: "Calzone",
    id: "rcUw6b4iYe0",
  },
  {
    name: "Pepperoni and sausage pizza",
    id: "NQDNtKKO2fA",
  },
];

export const Pizza = dishes.map((dish) => ({
  ...dish,
  category: "Pizza",
}));
