import React, { useState } from "react";
import { useDrag } from "../../utility/useDrag";
import "./DishCard.css";
import { Dish } from "../../utility/Dish";

interface DishCard {
  url: string;
  name: string;
}

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

// const images: string[] = [
//   "brooke-lark-V4MBq8kue3U-unsplash.jpg",
//   "casey-lee-awj7sRviVXo-unsplash.jpg",
//   "cayla1-w6ftFbPCs9I-unsplash.jpg",
//   "edgar-castrejon-1SPu0KT-Ejg-unsplash.jpg",
//   "joseph-gonzalez-zcUgjyqEwe8-unsplash.jpg",
// ];

const DishCard = () => {
  const [dishNumber, setDishNumber] = useState(0);
  // dishNumber must come before useDrag call
  const [deltaX, deltaY, dragDispatch] = useDrag();

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
    <figure className="dishcard">
      <img
        onTouchStart={(e) => {
          e.stopPropagation();
          dragDispatch.start(e);
        }}
        onTouchMove={(e) => {
          dragDispatch.moving(e);
        }}
        onTouchEnd={() => {
          dragDispatch.finish(() => {
            if (deltaX > window.innerWidth / 4) {
              changeImageHandler("forward");
            } else if (deltaX < -window.innerWidth / 4) {
              changeImageHandler("backward");
            }
          });
        }}
        alt={dishes[dishNumber].name}
        src={require(`../../assets/${dishes[dishNumber].photo.url}`)}
        style={{
          width: 0.85 * window.innerWidth,
          height: (3 * 0.85 * window.innerWidth) / 2,
          position: "relative",
          transform: `translate(${deltaX}px, ${deltaY}px)`,
        }}
      />
      <figcaption>{dishes[dishNumber].name}</figcaption>
      <div>
        Photo by{" "}
        <a
          href={
            "https://unsplash.com/@anniespratt?utm_source=That Looks Good&utm_medium=referral"
          }
        >
          {dishes[dishNumber].photo.photographer}
        </a>{" "}
        on{" "}
        <a href="https://unsplash.com/?utm_source=That Looks Good&utm_medium=referral">
          Unsplash
        </a>
      </div>
    </figure>
  );
};

export { DishCard };
