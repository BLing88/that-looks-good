const dishes = [
  {
    name: "Chicken sandwich",
    id: "rFYmnobNI6o",
  },
  {
    name: "Cheeseburger",
    id: "j-MPEwH9LM4",
  },
  {
    name: "Oatmeal with fruit",
    id: "SH6vc3VOOwE",
  },
  {
    name: "French toast",
    id: "zcUgjyqEwe8",
  },
  {
    name: "White fish in cream sauce",
    id: "8pUjhBm4cLw",
  },
  {
    name: "Scrambled eggs on toast",
    id: "4gmBIFraSuE",
  },
  {
    name: "Gyro",
    id: "SNLfVYmL8os",
  },
  {
    name: "Quiche",
    id: "vrNs8Y8exAQ",
  },
  {
    name: "Omelette and home fries",
    id: "_s6zOa3LzR0",
  },
  {
    name: "Shakshuka",
    id: "rzPVSqQjjqs",
  },
  {
    name: "French onion soup",
    id: "FjxEnioTNs0",
  },
  {
    name: "Grilled lemon chicken",
    id: "mjcJ0FFgdWI",
  },
  {
    name: "Chili",
    id: "IiVf9Hfh4Bw",
  },
  {
    name: "Grilled pork chop",
    id: "Yr4n8O_3UPc",
  },
  {
    name: "Bagel with lox and cream cheese",
    id: "bypcCMcIoVE",
  },
  {
    name: "Lox eggs benedict",
    id: "Wu4ZBeitiyM",
  },
  {
    name: "Pan seared salmon",
    id: "bpPTlXWTOvg",
  },
];

export const MiscDishes = dishes.map((dish) => ({
  ...dish,
  category: "Misc",
}));
