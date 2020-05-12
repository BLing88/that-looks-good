import React, { useState } from "react";
import "./App.css";
import { DishCard } from "./components/DishCard";
import { Header } from "./components/Header";
import { Dish } from "./utility/Dish";

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

function App() {
  const [dishNumber, setDishNumber] = useState(0);
  const changeImageHandler = (direction: string): void => {
    setDishNumber((dishNumber: number): number => {
      if (direction === "forward") {
        return (dishNumber + 1) % dishes.length;
      } else {
        return (dishNumber - 1 + dishes.length) % dishes.length;
      }
    });
  };

  return (
    <div className="App">
      <Header />
      <DishCard
        dish={dishes[dishNumber]}
        changeImageHandler={changeImageHandler}
      />
    </div>
  );
}

export default App;
