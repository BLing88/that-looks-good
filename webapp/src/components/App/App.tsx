import React from "react";
import { AuthenticatedApp } from "../AuthenticatedApp";
import { getRandomDish } from "../../Dishes/getRandomDish";

export const App = () => {
  return (
    <div>
      <AuthenticatedApp getRandomDish={getRandomDish} />
    </div>
  );
};
