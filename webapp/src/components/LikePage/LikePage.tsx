import React from "react";
import { Dish } from "../../utility/Dish";

export const LikePage = ({ likedDishes }: { likedDishes: Dish[] }) => {
  return (
    <main className="like-page">
      <p>You liked these dishes:</p>
      <ul className="liked-dishes-list">
        {likedDishes.map((dish) => (
          <li key={dish.photo.id}>{dish.name}</li>
        ))}
      </ul>
    </main>
  );
};
