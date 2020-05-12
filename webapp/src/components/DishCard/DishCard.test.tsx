import React from "react";
import { render } from "@testing-library/react";
import { DishCard } from "./DishCard";

const dishes: Dish[] = [
  {
    name: "dish 0",
    category: "food",
    photo: {
      id: "photo-0",
      photographer: "photographer 0",
      photographerProfileURL: "url-0",
      url: "brooke-lark-V4MBq8kue3U-unsplash.jpg",
    },
  },
  {
    name: "dish 1",
    category: "food",
    photo: {
      id: "photo-1",
      photographer: "photographer 1",
      photographerProfileURL: "url-1",
      url: "casey-lee-awj7sRviVXo-unsplash.jpg",
    },
  },
  {
    name: "dish 2",
    category: "food",
    photo: {
      id: "photo-2",
      photographer: "photographer 2",
      photographerProfileURL: "url-2",
      url: "cayla1-w6ftFbPCs9I-unsplash.jpg",
    },
  },
  {
    name: "dish 3",
    category: "food",
    photo: {
      id: "photo-3",
      photographer: "photographer 3",
      photographerProfileURL: "url-3",
      url: "edgar-castrejon-1SPu0KT-Ejg-unsplash.jpg",
    },
  },
  {
    name: "dish 4",
    category: "food",
    photo: {
      id: "photo-4",
      photographer: "photographer 4",
      photographerProfileURL: "url-4",
      url: "joseph-gonzalez-zcUgjyqEwe8-unsplash.jpg",
    },
  },
];

describe("DishCard ", () => {
  test("properly attributes photographer and Unsplash", () => {
    const dish = dishes[0];
    const { getByText } = render(
      <DishCard dish={dish} changeImageHandler={jest.fn()} />
    );
    expect(getByText("Unsplash")).toBeInTheDocument();
    expect(getByText(/^photo by/i)).toBeInTheDocument();
    expect(getByText(dish.name)).toBeInTheDocument();
    expect(getByText(dish.photo.photographer)).toBeInTheDocument();
  });
});
