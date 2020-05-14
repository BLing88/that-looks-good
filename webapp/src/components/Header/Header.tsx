import React from "react";
import "./Header.css";

const Header = ({ clickLikeHandler }: { clickLikeHandler: () => void }) => {
  return (
    <header className="app-header">
      <div>Profile</div>
      <button
        onClick={() => {
          clickLikeHandler();
        }}
      >
        Liked
      </button>
    </header>
  );
};

export { Header };
