import React from "react";
import "./Header.css";

const Header = ({
  toggleLikeHandler,
  logout,
  reset,
  showLiked,
}: {
  toggleLikeHandler: () => void;
  logout: () => void;
  reset: () => void;
  showLiked: boolean;
}) => {
  return (
    <header className="app-header">
      <button
        onClick={(e) => {
          e.preventDefault();
          logout();
        }}
      >
        Log out
      </button>
      <button onClick={reset}>Reset</button>
      <button
        onClick={() => {
          toggleLikeHandler();
        }}
      >
        {showLiked ? "Dishes" : "Liked"}
      </button>
    </header>
  );
};

export { Header };
