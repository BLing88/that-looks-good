import React, { useState, CSSProperties } from "react";
import { useDrag } from "../../utility/useDrag";
import "./DishCard.css";
import { Dish } from "../../utility/Dish";
import { LoadingSpinner } from "../LoadingSpinner";

interface DishCard {
  url: string;
  name: string;
}

interface VelocityVector {
  vx: number;
  vy: number;
}

const transitionHandler = (
  deltaX: number,
  deltaY: number,
  setTransition: React.Dispatch<React.SetStateAction<VelocityVector>>
) => {
  const r = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
  const vx = (90 * deltaX) / r;
  const vy = (90 * deltaY) / r;
  return () =>
    setTransition((oldTransition) => ({
      vx: oldTransition.vx + vx,
      vy: oldTransition.vy + vy,
    }));
};
const initialTransition: VelocityVector = {
  vx: 0,
  vy: 0,
};

const timeStep = 1000 / 60;
const transitionDuration = 250;

const DishCard = ({
  dish,
  changeImageHandler,
}: {
  dish: Dish;
  changeImageHandler: (direction: string) => void;
}) => {
  const [deltaX, deltaY, dragDispatch] = useDrag();
  const [imgLoaded, setImgLoaded] = useState(false);
  const [transition, setTransition] = useState(initialTransition);

  const loadingStyle: CSSProperties = {
    height: 1,
    width: 1,
    position: "absolute",
  };
  const loadedStyle: CSSProperties = {
    width: Math.min(400, Math.floor(0.85 * window.innerWidth)),
    height: Math.min(600, Math.floor((3 * 0.85 * window.innerWidth) / 2)),
    position: "relative",
    transform: `translate(${deltaX + transition.vx}px, ${
      deltaY + transition.vy
    }px)`,
  };

  return (
    <figure className="dishcard">
      <div
        className="image"
        style={{
          width: Math.min(400, Math.floor(0.85 * window.innerWidth)),
          height: Math.min(600, Math.floor((3 * 0.85 * window.innerWidth) / 2)),
        }}
      >
        {imgLoaded ? null : <LoadingSpinner width={30} height={30} />}
        <img
          onTouchStart={(e) => {
            e.stopPropagation();
            dragDispatch.start(e);
          }}
          onTouchMove={(e) => {
            dragDispatch.moving(e);
          }}
          onTouchEnd={() => {
            if (deltaX > window.innerWidth / 4) {
              const interval = setInterval(
                transitionHandler(deltaX, deltaY, setTransition),
                timeStep
              );
              setTimeout(() => {
                clearInterval(interval);
                dragDispatch.finish(() => {
                  changeImageHandler("forward");
                });
              }, transitionDuration);
            } else if (deltaX < -window.innerWidth / 4) {
              const interval = setInterval(
                transitionHandler(deltaX, deltaY, setTransition),
                timeStep
              );
              setTimeout(() => {
                clearInterval(interval);
                dragDispatch.finish(() => {
                  changeImageHandler("backward");
                });
              }, transitionDuration);
            } else {
              dragDispatch.finish(() => {});
            }
          }}
          alt={dish.name}
          src={
            dish.photo.url +
            "&fit=crop&crop=entropy" +
            `&w=${Math.min(
              400,
              Math.floor(0.85 * window.innerWidth)
            )}&h=${Math.min(
              600,
              Math.floor((3 * 0.85 * window.innerWidth) / 2)
            )}`
          }
          style={imgLoaded ? loadedStyle : loadingStyle}
          onLoad={() => {
            setImgLoaded(true);
          }}
        />
      </div>
      <figcaption>{dish.name}</figcaption>
      <footer className="attribution">
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
      </footer>
    </figure>
  );
};

export { DishCard };
