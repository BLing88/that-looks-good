const dishes = [
  {
    name: "Mapo tofu",
    id: "3DZTercmEF4",
  },
  {
    name: "Wonton soup",
    id: "P5IhVmH6FoM",
  },
  {
    name: "Beef noodle soup (牛肉麵)",
    id: "H5Hj8QV2Tx4",
  },
  {
    name: "Dumplings",
    id: "LR559Dcst70",
  },
  {
    name: "Dim sum",
    id: "0RNqWu4AEVE",
  },
  {
    name: "Hot pot",
    id: "1gkvpUCQkmA",
  },
  {
    name: "Spicy hot pot (麻辣烫)",
    id: "AjqhHqmDMqQ",
  },
  {
    name: "Fried rice",
    id: "dTNNDTbZr8I",
  },
  {
    name: "Lu rou fan",
    id: "X1_ZJKz1yq8",
  },
  {
    name: "Chow mein",
    id: "mdWyghy08vg",
  },
  {
    name: "Pin rice noodles (銀針粉)",
    id: "5JyStjsZbUc",
  },
];

export const ChineseDishes = dishes.map((dish) => ({
  ...dish,
  category: "Chinese",
}));
