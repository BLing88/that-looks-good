import React from "react";
import { useDrag } from "../../utility/useDrag";
import "./DishCard.css";
import { Dish } from "../../utility/Dish";

interface DishCard {
  url: string;
  name: string;
}

const DishCard = ({
  dish,
  changeImageHandler,
}: {
  dish: Dish;
  changeImageHandler: (direction: string) => void;
}) => {
  const [deltaX, deltaY, dragDispatch] = useDrag();

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
        alt={dish.name}
        src={
          dish.photo.url +
          `&w=${Math.floor(0.85 * window.innerWidth)}&h=${Math.floor(
            (3 * 0.85 * window.innerWidth) / 2
          )}`
        }
        style={{
          width: 0.85 * window.innerWidth,
          height: (3 * 0.85 * window.innerWidth) / 2,
          position: "relative",
          transform: `translate(${deltaX}px, ${deltaY}px)`,
        }}
      />
      <figcaption>{dish.name}</figcaption>
      <div className="attribution">
        Photo by{" "}
        <a
          href={`https://unsplash.com/@${dish.photo.username}?utm_source=That Looks Good&utm_medium=referral`}
        >
          {dish.photo.photographer}
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
