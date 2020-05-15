import React from "react";
import { Dish } from "../../utility/Dish";

export const LikePage = ({ likedDishes }: { likedDishes: Dish[] }) => {
  return (
    <main className="like-page">
      {likedDishes.length !== 0 ? (
        <>
          <p>You liked these dishes:</p>
          <ul className="liked-dishes-list">
            {likedDishes.map((dish) => (
              <li className="liked-dishes-item" key={dish.photo.id}>
                {dish.name}
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p>You haven't liked any dishes yet</p>
      )}
    </main>
  );
};
