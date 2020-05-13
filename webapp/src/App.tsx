import React, { useState, useEffect } from "react";
import "./App.css";
import { DishCard } from "./components/DishCard";
import { Header } from "./components/Header";
import { Dish, DatabaseDish } from "./utility/Dish";
import { GET_DISH } from "./queries/queries";
import { getRandomDish } from "./Dishes/getRandomDish";
import { useLazyQuery } from "@apollo/react-hooks";

const hashTable = new Map();

const initialProbDist = [0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1];
const initial = getRandomDish(initialProbDist);
if (!hashTable.get(initial.id)) {
  hashTable.set(initial.id, true);
}
const initialDish = () => initial;

const toProbDist = ({
  counts,
  totalSwipes,
}: {
  counts: number[];
  totalSwipes: number;
}) => {
  if (totalSwipes < 100) {
    return initialProbDist;
  } else {
    return counts.map((n: number) => n / totalSwipes);
  }
};

const App = ({
  getRandomDish,
}: {
  getRandomDish: (probDist: number[]) => DatabaseDish;
}) => {
  if (!localStorage.getItem("that-looks-good-swipe-counts")) {
    localStorage.setItem(
      "that-looks-good-swipe-counts",
      JSON.stringify({ counts: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], totalSwipes: 0 })
    );
  }
  const probDist = toProbDist(
    JSON.parse(localStorage.getItem("that-looks-good-swipe-counts")!)
  );
  const [dishInfo, setDishInfo] = useState(initialDish);
  const [getDish, { loading, error, data }] = useLazyQuery(GET_DISH);

  useEffect(() => {
    getDish({
      variables: {
        dishId: dishInfo.id,
      },
    });
  }, [getDish, dishInfo.id]);

  const changeImageHandler = (direction: string): void => {
    if (direction === "forward") {
      console.log("swipe right");
      // // update probDist
      // const randomDish = getRandomDish(probDist);
      // // update hashtable
      // setDishInfo(randomDish);
    } else {
      console.log("swipe left");
      // // update probDist
      // const randomDish = getRandomDish(probDist);
      // setDishInfo(randomDish);
    }
  };

  return (
    <div className="App">
      <Header />
      {error && <div>There was an error loading.</div>}
      {loading && <div>Loading&hellip;</div>}
      {data && (
        <DishCard
          dish={{
            name: dishInfo.name,
            category: dishInfo.category,
            photo: {
              id: data.getDish.dishId,
              url: data.getDish.urls.raw,
              username: data.getDish.user.username,
              photographer: data.getDish.user.name,
              photographerProfileURL: data.getDish.user.htmlUrl,
            },
          }}
          changeImageHandler={changeImageHandler}
        />
      )}
    </div>
  );
};

export default App;
