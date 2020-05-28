import React from "react";
import { Dish } from "../../utility/Dish";
import "./LikePage.css";

export const LikePage = ({ likedDishes }: { likedDishes: Dish[] }) => {
  return likedDishes.length !== 0 ? (
    <article className="like-page">
      <p>You liked these dishes:</p>
      <ul className="liked-dishes-list">
        {likedDishes.map((dish) => (
          <li className="liked-dishes-item" key={dish.photo.id}>
            {dish.name}
          </li>
        ))}
      </ul>
    </article>
  ) : (
    <article className="no-likes-page">
      <p>You haven&rsquo;t liked any dishes yet&hellip;</p>
    </article>
  );
};
