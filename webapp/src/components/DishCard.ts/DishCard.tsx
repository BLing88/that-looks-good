import React, { useState, useReducer } from "react";
// import "./DishCard.css";

const images: string[] = [
  "brooke-lark-V4MBq8kue3U-unsplash.jpg",
  "casey-lee-awj7sRviVXo-unsplash.jpg",
  "cayla1-w6ftFbPCs9I-unsplash.jpg",
  "edgar-castrejon-1SPu0KT-Ejg-unsplash.jpg",
  "joseph-gonzalez-zcUgjyqEwe8-unsplash.jpg",
];

const START = "start";
const MOVING = "moving";
const FINISH = "finish";

interface DisplacementVector {
  deltaX: number;
  deltaY: number;
  [propName: string]: number;
}

interface ReducerAction {
  type: string;
  [propName: string]: any;
}

const initialDragVector: DisplacementVector = {
  startX: 0,
  startY: 0,
  deltaX: 0,
  deltaY: 0,
};

const dragPosReducer = (
  state: DisplacementVector,
  action: ReducerAction
): DisplacementVector => {
  switch (action.type) {
    case START:
      return {
        ...state,
        startX: action.startX,
        startY: action.startY,
      };
    case MOVING:
      return {
        ...state,
        deltaX: action.finishX - state.startX,
        deltaY: action.finishY - state.startY,
      };
    case FINISH:
      if (state.deltaX > window.innerWidth / 4) {
        action.changeImage("forward");
      } else if (state.deltaX < -window.innerWidth / 4) {
        action.changeImage("backward");
      }
      return initialDragVector;
    default:
      return state;
  }
};

function DishCard() {
  const [image, setImage] = useState(0);
  const [dragState, dragDispatch] = useReducer(
    dragPosReducer,
    initialDragVector
  );

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
          dragDispatch({
            type: START,
            startX: e.touches[0].clientX,
            startY: e.touches[0].clientY,
          });
        }}
        onTouchMove={(e) => {
          dragDispatch({
            type: MOVING,
            finishX: e.touches[0].clientX,
            finishY: e.touches[0].clientY,
          });
        }}
        onTouchEnd={() => {
          dragDispatch({
            type: FINISH,
            changeImage: changeImageHandler,
          });
        }}
        src={require(`../../assets/${images[image]}`)}
        alt="random dish"
        style={{
          width: 200,
          height: 300,
          position: "relative",
          transform: `translate(${dragState.deltaX}px, ${dragState.deltaY}px)`,
        }}
      />
    </figure>
  );
}

export { DishCard };
