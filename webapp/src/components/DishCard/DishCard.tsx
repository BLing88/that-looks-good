import React, { useState } from "react";
import { useDrag } from "../../utility/useDrag";
import "./DishCard.css";

const images: string[] = [
  "brooke-lark-V4MBq8kue3U-unsplash.jpg",
  "casey-lee-awj7sRviVXo-unsplash.jpg",
  "cayla1-w6ftFbPCs9I-unsplash.jpg",
  "edgar-castrejon-1SPu0KT-Ejg-unsplash.jpg",
  "joseph-gonzalez-zcUgjyqEwe8-unsplash.jpg",
];

interface DishCard {
  url: string;
  name: string;
}

const DishCard = () => {
  const [image, setImage] = useState(0);
  const [deltaX, deltaY, dragDispatch] = useDrag();

  const changeImageHandler = (direction: string): void => {
    setImage((image: number): number => {
      if (direction === "forward") {
        return (image + 1) % images.length;
      } else {
        return (image - 1 + images.length) % images.length;
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
        src={require(`../../assets/${images[image]}`)}
        style={{
          width: 0.85 * window.innerWidth,
          height: (3 * 0.85 * window.innerWidth) / 2,
          position: "relative",
          transform: `translate(${deltaX}px, ${deltaY}px)`,
        }}
      />
      <figcaption>Dish name</figcaption>
    </figure>
  );
};

export { DishCard };
