import React, { useState } from "react";
import { Dish } from "../../utility/Dish";
import "./LikePage.css";

interface showImageInfo {
  showImg: boolean;
  name: string | null;
  url: string | null;
}

const defaultImgInfo: showImageInfo = { showImg: false, url: null, name: null };

export const LikePage = ({ likedDishes }: { likedDishes: Dish[] }) => {
  const [showImgInfo, setShowImgInfo] = useState(defaultImgInfo);

  return likedDishes.length !== 0 ? (
    <article className="like-page">
      <p>You liked these dishes:</p>
      <div className="like-grid">
        <ul className="liked-dishes-list">
          {likedDishes.map((dish) => (
            <li className="liked-dishes-item" key={dish.photo.id}>
              <span
                onClick={() => {
                  setShowImgInfo((_) => ({
                    showImg: true,
                    url: dish.photo.url,
                    name: dish.name,
                  }));
                }}
              >
                {dish.name}
              </span>
            </li>
          ))}
        </ul>
        {showImgInfo.showImg ? (
          <img
            className={"dish-image"}
            onClick={() => {
              setShowImgInfo(defaultImgInfo);
            }}
            alt={showImgInfo.name!}
            src={
              showImgInfo.url +
              "&fit=crop&crop=entropy" +
              `&w=${Math.min(
                400,
                Math.floor(0.85 * window.innerWidth)
              )}&h=${Math.min(
                600,
                Math.floor((3 * 0.85 * window.innerWidth) / 2)
              )}`
            }
          />
        ) : null}
      </div>
    </article>
  ) : (
    <article className="no-likes-page">
      <p>You haven&rsquo;t liked any dishes yet&hellip;</p>
    </article>
  );
};
