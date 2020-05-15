import React from "react";
import "./Header.css";

const Header = ({
  clickLikeHandler,
  logout,
}: {
  clickLikeHandler: () => void;
  logout: () => void;
}) => {
  return (
    <header className="app-header">
      <button onClick={logout}>Log out</button>
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
