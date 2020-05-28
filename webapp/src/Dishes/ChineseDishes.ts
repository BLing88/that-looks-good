const dishes = [
  {
    name: "Mapo tofu",
    id: "3DZTercmEF4",
  },
  {
    name: "Wonton soup",
    id: "ZQE6dAsiwbM",
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
    id: "wEBg_pYtynw",
  },
  {
    name: "Pin rice noodles (銀針粉)",
    id: "5JyStjsZbUc",
  },
  {
    name: "Steamed fish (清蒸魚)",
    id: "aNE4i_MPRxM",
  },
  {
    name: "Cantonese poached chicken (白切雞)",
    id: "kXQPhdg6SXg",
  },
];

export const ChineseDishes = dishes.map((dish) => ({
  ...dish,
  category: "Chinese",
}));
