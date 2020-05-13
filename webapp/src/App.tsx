import React, { useState, useEffect } from "react";
import "./App.css";
import { DishCard } from "./components/DishCard";
import { Header } from "./components/Header";
import { Dish } from "./utility/Dish";
import { getRandomDish } from "./Dishes/getRandomDish";

import { gql } from "apollo-boost";
import { useLazyQuery } from "@apollo/react-hooks";

const GET_DISH = gql`
  query getDish($dishId: ID!) {
    getDish(dishId: $dishId) {
      dishId
      user {
        name
        username
        htmlUrl
      }
      urls {
        raw
      }
    }
  }
`;

// const dishes: Dish[] = [
//   {
//     name: "dish 0",
//     category: "food",
//     photo: {
//       id: "photo-0",
//       photographer: "photographer 0",
//       photographerProfileURL: "url-0",
//       url: "brooke-lark-V4MBq8kue3U-unsplash.jpg",
//     },
//   },
//   {
//     name: "dish 1",
//     category: "food",
//     photo: {
//       id: "photo-1",
//       photographer: "photographer 1",
//       photographerProfileURL: "url-1",
//       url: "casey-lee-awj7sRviVXo-unsplash.jpg",
//     },
//   },
//   {
//     name: "dish 2",
//     category: "food",
//     photo: {
//       id: "photo-2",
//       photographer: "photographer 2",
//       photographerProfileURL: "url-2",
//       url: "cayla1-w6ftFbPCs9I-unsplash.jpg",
//     },
//   },
//   {
//     name: "dish 3",
//     category: "food",
//     photo: {
//       id: "photo-3",
//       photographer: "photographer 3",
//       photographerProfileURL: "url-3",
//       url: "edgar-castrejon-1SPu0KT-Ejg-unsplash.jpg",
//     },
//   },
//   {
//     name: "dish 4",
//     category: "food",
//     photo: {
//       id: "photo-4",
//       photographer: "photographer 4",
//       photographerProfileURL: "url-4",
//       url: "joseph-gonzalez-zcUgjyqEwe8-unsplash.jpg",
//     },
//   },
// ];

function App() {
  // const probDist = localStorage.get('that-looks-good-probDist') ? localStorage.get('that-looks-good-probDist'): [0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1];
  const probDist = [0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1];
  const [dishInfo, setDishInfo] = useState(getRandomDish(probDist));
  // const [dish, setDish] = useState(null);

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
      // update probDist
      const randomDish = getRandomDish(probDist);
      setDishInfo(randomDish);
    } else {
      // update probDist
      const randomDish = getRandomDish(probDist);
      setDishInfo(randomDish);
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
}

export default App;
