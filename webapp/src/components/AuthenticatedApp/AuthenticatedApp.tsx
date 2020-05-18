import React, { useState, useEffect } from "react";
import "./AuthenticatedApp.css";
import { DishCard } from "../DishCard";
import { Header } from "../Header";
import { LikePage } from "../LikePage";
import { Dish, DatabaseDish, Category } from "../../utility/Dish";
import { GET_DISH } from "../../queries/queries";
import { useLazyQuery } from "@apollo/react-hooks";
import { useAuth0 } from "../../react-auth0-spa";
import { LoadingSpinner } from "../LoadingSpinner";
import { UndoReset } from "../UndoReset";

const hashTable = new Map();

const initialProbDist = [0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1];

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

const storageKey = "that-looks-good-swipe-counts";

const AuthenticatedApp = ({
  getRandomDish,
}: {
  getRandomDish: (probDist: number[]) => DatabaseDish;
}) => {
  const initial = getRandomDish(initialProbDist);
  const initialDish = () => initial;
  if (!localStorage.getItem(storageKey)) {
    localStorage.setItem(
      storageKey,
      JSON.stringify({ counts: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], totalSwipes: 0 })
    );
  }
  const probDist = toProbDist(JSON.parse(localStorage.getItem(storageKey)!));
  const [dishInfo, setDishInfo] = useState(initialDish);
  const [getDish, { loading, error, data }] = useLazyQuery(GET_DISH);
  const [showLiked, setShowLiked] = useState(false);
  const [sessionLikedDishes, setSessionLikedDishes] = useState([] as Dish[]);
  const { logout } = useAuth0()!;
  const [showUndo, setShowUndo] = useState({
    show: false,
    prevLikedDishes: [] as Dish[],
  });

  useEffect(() => {
    getDish({
      variables: {
        dishId: dishInfo.id,
      },
    });
  }, [getDish, dishInfo.id]);

  const changeImageHandler = (direction: string): void => {
    const old = JSON.parse(localStorage.getItem(storageKey)!);
    const indexToUpdate = Category[dishInfo.category as keyof typeof Category];
    if (direction === "forward") {
      // console.log("swipe right");
      // update probDist
      if (!hashTable.get(dishInfo.id)) {
        // only update if dish haven't seen before
        // in current session
        localStorage.setItem(
          storageKey,
          JSON.stringify({
            counts: [
              ...old.counts.slice(0, indexToUpdate),
              old.counts[indexToUpdate] + 1,
              ...old.counts.slice(indexToUpdate + 1),
            ],
            totalSwipes: old.totalSwipes + 1,
          })
        );
        hashTable.set(dishInfo.id, true);
        setSessionLikedDishes((sessionLikedDishes) => [
          ...sessionLikedDishes,
          {
            name: dishInfo.name,
            category: dishInfo.category,
            photo: {
              id: data.getDish.dishId,
              url: data.getDish.urls.raw,
              username: data.getDish.user.username,
              photographer: data.getDish.user.name,
              photographerProfileURL: data.getDish.user.htmlUrl,
            },
          },
        ]);
      }

      let randomDish = getRandomDish(probDist);
      // update hashtable
      // while (hashTable.get(randomDish.id)) {
      //   randomDish = getRandomDish(probDist);
      // }
      // hashTable.set(randomDish.id, true);
      setDishInfo(randomDish);
    } else {
      // console.log("swipe left");
      let randomDish = getRandomDish(probDist);
      // while (hashTable.get(randomDish.id)) {
      //   randomDish = getRandomDish(probDist);
      // }
      // hashTable.set(randomDish.id, true);

      setDishInfo(randomDish);
    }
  };

  const resetHandler = () => {
    if (sessionLikedDishes.length > 0) {
      setShowUndo({ show: true, prevLikedDishes: sessionLikedDishes });
    }
    hashTable.clear();
    setSessionLikedDishes([] as Dish[]);
  };

  const undoResetHandler = () => {
    setSessionLikedDishes(showUndo.prevLikedDishes);
    setShowUndo({ show: false, prevLikedDishes: [] });
  };

  const closeHandler = () => {
    setShowUndo({ show: false, prevLikedDishes: [] });
  };

  return (
    <div className="authenticated-app">
      <Header
        toggleLikeHandler={() => {
          setShowLiked((show) => !show);
        }}
        logout={logout}
        reset={resetHandler}
        showLiked={showLiked}
      />
      <main className="main-content">
        {showUndo.show && showLiked && (
          <UndoReset
            undoResetHandler={undoResetHandler}
            closeHandler={closeHandler}
            className={"undo-reset"}
          />
        )}
        {error && <div>There was an error loading.</div>}

        {loading && !data && !showLiked && (
          <div
            className="loading"
            style={{
              height: Math.min(
                600,
                Math.floor((3 * 0.85 * window.innerWidth) / 2)
              ),
            }}
          >
            <LoadingSpinner width={30} height={30} />
          </div>
        )}

        {data && !showLiked && (
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

        {showLiked && <LikePage likedDishes={sessionLikedDishes} />}
      </main>
    </div>
  );
};

export { AuthenticatedApp };
